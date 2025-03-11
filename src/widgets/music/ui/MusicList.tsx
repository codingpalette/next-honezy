'use client';

import { useGetYoutubeMusic } from "@/src/entities/youtube";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useEffect, useState } from "react";




export function MusicList() {

  const [selectedMember, setSelectedMember] = useState('')

  const { data, isLoading } = useGetYoutubeMusic({ channel_id: selectedMember })





  return (
    <>
      <div className="mt-10">
        <ul className="flex gap-4 items-center flex-wrap">
          <li>
            <button
              type="button"
              className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2  
                            cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${selectedMember === '' ? 'border-green-600' : 'border-gray-600'}`}
              onClick={() => setSelectedMember('')}
            >

              <Image src={`/honeyz.jpg`} width={40} height={40} alt="허니즈" />
            </button>
          </li>
          {channels.map((member) => (
            <li key={member.youtube_id}>
              <button
                type="button"
                className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2  
                            cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${member.youtube_id === selectedMember ? 'border-green-600' : 'border-gray-600'}`}
                onClick={() => setSelectedMember(member.youtube_id)}
              >
                <Image src={`/${member.image}`} width={40} height={40} alt={member.name} />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <ul className="list bg-base-100 rounded-box shadow-md">
            {data?.map((music, index) => (
              <li className="list-row" key={music.id}>
                <div className="text-4xl font-thin opacity-30 tabular-nums w-[50px]">{index + 1}</div>
                <div className="size-10 rounded-box overflow-hidden">
                  <img className="object-cover w-full h-full " src={music.thumbnail} />
                </div>
                <div className="list-col-grow">
                  <div>{music.title}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">{music.time}</div>
                </div>
                <a href={music.link} target="_blank">
                  <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}




