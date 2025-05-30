'use client';

import React, { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { members } from "@prisma/client";
import { useGetScheduleList } from "@/src/entities/schedule";

interface CalendarEvent {
  id: number;
  title: string;
  member: members;
  member_id: number;
  subtitle: string | null;
  time: string;
  video_link: string | null;
}

interface CalendarProps {
  eventsByDate?: Record<string, CalendarEvent[]>;
  onEventClick?: (event: CalendarEvent, date: dayjs.Dayjs) => void;
  initialDate?: dayjs.Dayjs | string | Date;
  showHeader?: boolean;
  onDateClick?: (date: dayjs.Dayjs) => void;
}

export function Calendar({
  eventsByDate,
  initialDate,
  showHeader = true,
  onDateClick,
  onEventClick,
}: CalendarProps) {
  dayjs.locale("ko");
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    initialDate ? dayjs(initialDate) : dayjs()
  );

  useEffect(() => {
    if (initialDate) {
      setCurrentDate(dayjs(initialDate));
    }
  }, [initialDate]);

  const [events, setEvents] = useState(eventsByDate);

  const { data } = useGetScheduleList({ date: currentDate.format("YYYY-MM") });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data])

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();
  const totalCells = 42;
  const daysArray: { date: dayjs.Dayjs; currentMonth: boolean }[] = [];

  // 이전 달 날짜
  for (let i = 0; i < startDay; i++) {
    const prevDay = startOfMonth.subtract(startDay - i, "day");
    daysArray.push({ date: prevDay, currentMonth: false });
  }
  // 이번 달 날짜
  for (let i = 1; i <= daysInMonth; i++) {
    const thisDay = startOfMonth.date(i);
    daysArray.push({ date: thisDay, currentMonth: true });
  }
  // 다음 달 날짜
  const nextDaysCount = totalCells - daysArray.length;
  for (let i = 1; i <= nextDaysCount; i++) {
    const nextDay = endOfMonth.add(i, "day");
    daysArray.push({ date: nextDay, currentMonth: false });
  }

  const rows: { date: dayjs.Dayjs; currentMonth: boolean }[][] = [];
  for (let i = 0; i < totalCells; i += 7) {
    rows.push(daysArray.slice(i, i + 7));
  }

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));

  return (
    <div className="max-w-full mx-auto ">
      {/* 헤더 */}
      {showHeader && (
        <div className="flex justify-between items-center mb-4">
          <button className="btn btn-sm btn-ghost" onClick={handlePrevMonth}>
            <ChevronLeft />
            이전 달
          </button>
          <div className="text-lg font-bold">
            {currentDate.format("YYYY년 MM월")}
          </div>
          <button className="btn btn-sm btn-ghost" onClick={handleNextMonth}>
            다음 달
            <ChevronRight />
          </button>
        </div>
      )}

      {/* 달력 테이블 */}
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr>
              {dayLabels.map((label, idx) => (
                <th
                  key={idx}
                  className={`text-center p-2 bg-base-200 text-sm ${idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : ""
                    }`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((week, rowIndex) => (
              <tr key={rowIndex}>
                {week.map((day, colIndex) => {
                  const dateKey = day.date.format("YYYY-MM-DD");
                  const isSunday = day.date.day() === 0;
                  const isSaturday = day.date.day() === 6;
                  const isToday = day.date.isSame(dayjs(), "day");
                  return (
                    <td
                      key={colIndex}
                      onClick={() => onDateClick?.(day.date)}
                      className={`p-2 align-top border border-base-300  bg-base-100 ${onDateClick ? "cursor-pointer hover:bg-base-200" : ""
                        } ${isToday ? "border-t-2 border-t-primary" : ""} ${day.currentMonth ? "" : "opacity-30"
                        }`}
                    >
                      <div className="flex flex-col min-h-[100px] w-[150px]">
                        {/* 날짜 */}
                        <div
                          className={`text-sm ${isToday
                            ? "text-primary font-bold"
                            : isSunday
                              ? "text-red-500"
                              : isSaturday
                                ? "text-blue-500"
                                : ""
                            }`}
                        >
                          {day.date.format("D")}
                        </div>

                        {/* 이벤트 리스트 */}
                        {events?.[dateKey] && (
                          <div className="mt-2 flex flex-col gap-2">
                            {events[dateKey].map((event) => {
                              let color = '#fff';
                              if (event.member_id === 2 || event.member_id === 4) {
                                color = "#000";
                              }

                              return (
                                <div
                                  className={`text-xs  p-1 rounded font-semibold ${onEventClick ? "cursor-pointer hover:opacity-80" : ""
                                    }`}
                                  style={{
                                    backgroundColor: event.member.color || "#e5e7eb", // 기본값: gray-200
                                    color: color, // 텍스트 색상 (어두운 배경 대비)
                                  }}
                                >
                                  {`${event.member.name}:${event.title} - ${event.time}`}
                                </div>
                              )
                            }
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
