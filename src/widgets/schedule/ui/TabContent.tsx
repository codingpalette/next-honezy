'use client'

import { Calendar } from "@/src/shared/ui";
import { members } from "@prisma/client";
import { NodeTab } from "./NodeTab";


interface CalendarEvent {
  id: number;
  title: string;
  member: members;
  member_id: number;
  subtitle: string | null;
  time: string;
  video_link: string | null;
}

interface TabContentProps {
  eventsByDate?: Record<string, CalendarEvent[]>;
}


export function TabContent({
  eventsByDate
}: TabContentProps) {
  return (
    <>
      <div className="tabs tabs-border">
        <input type="radio" name="my_tabs_2" className="tab" aria-label="달력" defaultChecked />
        <div className="tab-content p-2">
          <Calendar
            eventsByDate={eventsByDate}
          />
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="노드" />
        <div className="tab-content p-2">
          <NodeTab />
        </div>
      </div>
    </>
  )
}

