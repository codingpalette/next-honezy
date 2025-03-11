'use client';

import { useGetYoutubeMusic } from "@/src/entities/youtube";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useEffect, useState } from "react";

export function MusicList() {
  const [selectedMember, setSelectedMember] = useState('');
  const { data, isLoading } = useGetYoutubeMusic({ channel_id: selectedMember });

  return (
    <>
      <div className="mt-10">
        {/* 멤버 선택 버튼 */}
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

        {/* 음악 리스트 또는 스켈레톤 */}
        <div className="mt-2">
          <ul className="list bg-base-100 rounded-box shadow-md">
            {isLoading ? (
              // 로딩 중일 때 스켈레톤 표시
              Array(10).fill(0).map((_, index) => (
                <li className="list-row" key={index}>
                  <div className="skeleton h-10 w-[50px]"></div> {/* 숫자 */}
                  <div className="skeleton size-10 rounded-box"></div> {/* 썸네일 */}
                  <div className="list-col-grow flex flex-col gap-2">
                    <div className="skeleton h-4 w-3/4"></div> {/* 제목 */}
                    <div className="skeleton h-3 w-1/4"></div> {/* 시간 */}
                  </div>
                  <div className="skeleton h-10 w-10 rounded-box"></div> {/* 버튼 */}
                </li>
              ))
            ) : (
              // 데이터가 로드된 경우 실제 콘텐츠 표시
              data?.map((music, index) => (
                <li className="list-row" key={music.id}>
                  <div className="text-4xl font-thin opacity-30 tabular-nums w-[50px]">
                    {index + 1}
                  </div>
                  <div className="size-10 rounded-box overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={music.thumbnail}
                      alt={music.title}
                    />
                  </div>
                  <div className="list-col-grow">
                    <div>{music.title}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {music.time}
                    </div>
                  </div>
                  <a href={music.link} target="_blank">
                    <button className="btn btn-square btn-ghost">
                      <svg
                        className="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                      </svg>
                    </button>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
