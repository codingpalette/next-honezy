'use server';

import axios from "axios";
import { db } from "@/src/shared/lib";
import dayjs from "dayjs";
import { members, schedule } from "@prisma/client";

// Prisma에서 반환되는 Schedule 타입 (member 포함)
type ScheduleWithMember = schedule & { member: members };

// CalendarEvent와 매핑
interface CalendarEvent {
  id: number;
  title: string;
  member: members;
  member_id: number;
  subtitle: string | null;
  time: string;
  video_link: string | null;
}

export async function getScheduleList({ date }: { date: string }) {
  // date: "2025-03"

  // 기준 날짜 설정
  const current = dayjs(date, "YYYY-MM");

  // 앞 달, 현재 달, 뒷 달의 범위 계산
  const startDate = current.subtract(1, "month").startOf("month"); // 2025-02-01
  const endDate = current.add(1, "month").endOf("month");          // 2025-04-30

  // Prisma 쿼리로 스케줄 조회
  const schedules = await db.schedule.findMany({
    where: {
      date: {
        gte: startDate.toDate(), // 시작 날짜 이상
        lte: endDate.toDate(),   // 종료 날짜 이하
      },
    },
    include: {
      member: true, // 멤버 정보 포함
    },
    orderBy: {
      time: "asc",
    },
  });

  // Prisma 데이터를 CalendarEvent로 변환
  const grouped = schedules.reduce<Record<string, CalendarEvent[]>>((acc, s) => {
    const dateKey = dayjs(s.date).format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({
      id: Number(s.id),          // BigInt -> number
      title: s.title,
      member: s.member,
      member_id: Number(s.member_id), // BigInt -> number
      subtitle: s.subtitle,
      time: s.time,
      video_link: s.video_link,
    });
    return acc;
  }, {});

  return grouped;
}


export async function getNodeList({ memberIds, keyword }: { memberIds: number[], keyword: string }) {
  const nodes = await db.schedule.findMany({
    where: {
      video_link: {
        not: null, // video_link가 있는 스케줄만 조회
      },
      member_id: {
        in: memberIds.map(id => BigInt(id)), // 선택된 멤버 ID로 필터링
      },
      OR: keyword
        ? [
          {
            title: {
              contains: keyword, // 스케줄 제목에서 키워드 검색
              mode: 'insensitive', // 대소문자 구분 없이 검색
            },
          },
          {
            tags: {
              some: {
                tag: {
                  name: {
                    contains: keyword, // 태그 이름에서 키워드 검색
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
        ]
        : undefined, // 키워드가 없으면 OR 조건 제외
    },
    include: {
      tags: {
        include: {
          tag: true, // 태그 정보 포함
        },
      },
      member: true, // 멤버 정보 포함
    },
  });

  return nodes;
}


