'use client'

import { postYoutubeVideos, useGetYoutubeVideos } from "@/src/entities/youtube"
import { channels } from "@/src/shared/lib"
import { youtube_videos } from "@prisma/client"
import { Youtube } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"


interface YoutubeVideoProps {
  channel_id: string;
  initialData?: youtube_videos[];
}

export function YoutubeVideo({ channel_id }: YoutubeVideoProps) {


  const [members, setMembers] = useState(channels)
  const [selectedMember, setSelectedMember] = useState(channel_id)

  const { data: youtubeData, isLoading } = useGetYoutubeVideos({ channel_id: selectedMember })

  // const onclick = () => {
  //   console.log('click')
  //   postYoutubeVideos({ channel_id: "UC4fuIYuwKAIw_cW7hP6jf2w" })
  // }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-center text-xl font-semibold mb-2">유튜브 영상</h2>
        <ul className="flex gap-4 items-center flex-wrap">
          {members.map((member) => (
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
          <li>
            <button
              type="button"
              className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2  
                            cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${'UC4fuIYuwKAIw_cW7hP6jf2w' === selectedMember ? 'border-green-600' : 'border-gray-600'}`}
              onClick={() => setSelectedMember('UC4fuIYuwKAIw_cW7hP6jf2w')}
            >

              <Image src={`/honeyz.jpg`} width={40} height={40} alt="허니즈" />
            </button>

          </li>
        </ul>
        <div className="mt-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!isLoading ? (
              <>

                {youtubeData?.map((video: any) => (
                  <div key={video.id}>
                    <div className="rounded-md overflow-hidden aspect-video cursor-pointer relative">
                      <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" className="">
                        <img
                          src={video.thumbnails.high.url}
                          alt={video.title}
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
                    <p className="mt-1">{video.title}</p>
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



