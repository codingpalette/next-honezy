'use client'

import { getChzzkClips, useGetChzzkClips } from "@/src/entities/chzzk"
import { channels } from "@/src/shared/lib"
import { Youtube } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"



export function ChzzkClips({ channel_id }: { channel_id: string }) {


  const [selectedMember, setSelectedMember] = useState(channel_id)

  const { data, isLoading } = useGetChzzkClips({
    chzzk_id: selectedMember
  })


  return (
    <>

      <div className="mt-10">
        <h2 className="text-center text-xl font-semibold mb-2">치지직 클립</h2>
        <ul className="flex gap-4 items-center flex-wrap">
          {channels.map((member) => (
            <li key={member.chzzk_id}>
              <button
                type="button"
                className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2  
                            cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${member.chzzk_id === selectedMember ? 'border-green-600' : 'border-gray-600'}`}
                onClick={() => setSelectedMember(member.chzzk_id)}
              >
                <Image src={`/${member.image}`} width={40} height={40} alt={member.name} />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {!isLoading ? (
              <>
                {data?.content.data.map((clip: any) => (
                  <div key={clip.videoId}>
                    <div className="rounded-md overflow-hidden aspect-video cursor-pointer relative">
                      <a href={`https://chzzk.naver.com/clips/${clip.clipUID}`} target="_blank" className="">
                        <img
                          src={clip.thumbnailImageUrl}
                          alt={clip.clipTitle}
                          className="
                      block object-cover relative z-10 transition duration-300 ease-in-out transform
                      hover:scale-105 w-full h-full
                    "
                        />
                        <div
                          className="
                      absolute w-full h-full bg-black/30 z-20 left-0 top-0 pointer-events-none
                    "
                        ></div>
                        <Youtube size={48} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-30" />
                      </a>
                    </div>
                    <p className="mt-1">{clip.clipTitle}</p>
                  </div>

                ))}

              </>
            ) : (
              <>

                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex w-full flex-col gap-4">
                    <div className="skeleton aspect-video w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    {/* <div className="skeleton h-4 w-full"></div> */}
                    {/* <div className="skeleton h-4 w-full"></div> */}
                  </div>
                ))}
              </>
            )}


          </div>
        </div>

      </div>
    </>
  )
}
