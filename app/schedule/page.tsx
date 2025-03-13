import { getScheduleList } from "@/src/entities/schedule";
import { Calendar, MainLayou } from "@/src/shared/ui";
import dayjs from "dayjs";


import { Metadata, ResolvingMetadata } from "next";



export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허니즈로그 - SCHEDULE",
  };
}

export default async function SchedulePage() {

  const date = dayjs().format("YYYY-MM");
  const data = await getScheduleList({ date });

  return (
    <>
      <MainLayou>
        <Calendar
          eventsByDate={data}
        />
      </MainLayou>
    </>
  )
}

