import { getScheduleList } from "@/src/entities/schedule";
import { Calendar, MainLayou } from "@/src/shared/ui";
import { TabContent } from "@/src/widgets/schedule";
import dayjs from "dayjs";

import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic"; // 캐시 없이 항상 최신 데이터 가져오기

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
        <TabContent
          eventsByDate={data}

        />
        {/* <Node data={nodes} /> */}

        {/* <Calendar */}
        {/*   eventsByDate={data} */}
        {/* /> */}
      </MainLayou>
    </>
  )
}

