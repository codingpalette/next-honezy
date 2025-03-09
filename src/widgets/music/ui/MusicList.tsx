'use client';

import { useGetYoutubeMusic } from "@/src/entities/youtube";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useEffect, useState } from "react";




export function MusicList() {

  const [selectedMember, setSelectedMember] = useState('')

  const { data } = useGetYoutubeMusic({ channel_id: selectedMember })

  useEffect(() => {
    console.log('data', data)

  }, [data])




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

      </div>
    </>
  )
}




