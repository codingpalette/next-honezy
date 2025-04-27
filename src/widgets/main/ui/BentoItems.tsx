'use client'

import { postYoutubeVideos } from "@/src/entities/youtube";
import Image from "next/image";
import { useEffect } from "react";

interface BentoItemsProps {
  channelsWithLive: {
    channelName: string;
    name: string;
    youtube_id: string;
    chzzk_id: string;
    image: string;
    openLive: boolean;
  }[];
}

export function BentoItems({ channelsWithLive }: BentoItemsProps) {
  // 마우스 이벤트 핸들러들을 컴포넌트 내부에 정의합니다.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // 카드 내 x 좌표
    const y = e.clientY - rect.top;  // 카드 내 y 좌표
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10; // 최대 ±10도
    const rotateX = -((y - centerY) / centerY) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transition = "transform 0.5s ease-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };


  // useEffect(() => {
  //   console.log('channelsWithLive', channelsWithLive)
  //
  // }, [channelsWithLive])


  const onClickEvent = async () => {

    try {
      await postYoutubeVideos({
        channel_id: "UCicn6yqObjHrCKWkKL70ALg"
      })
    } catch (error) {

    }
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {/* 첫 번째 카드에 마우스 이벤트 적용 */}
        <div
          className="relative lg:row-span-2 card-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card bg-base-100 h-full shadow-sm overflow-hidden">
            <a
              href="https://www.youtube.com/watch?v=pjeK4zHCkvE"
              target="_blank"
              aria-label="허니즈 'HoneyHeart♡' Official MV"
              className="block w-full h-full bg-cover bg-center aspect-square lg:aspect-auto relative"
              style={{ backgroundImage: `url('/honeyz4.webp')` }}
            >
              <div className="absolute left-0 bottom-0 text-white p-4 bg-black/50 w-full text-center card-title-overlay">HoneyHeart♡</div>
            </a>
          </div>
        </div>

        {/* 맴버 라이브 현황 */}
        <div className="relative max-lg:row-start-1">
          <div className="card bg-base-100 shadow-sm">
            <ul className="card-body">
              {channelsWithLive.map((channel) => (
                <li key={channel.chzzk_id} className="w-full">
                  <a
                    href={`https://chzzk.naver.com/live/${channel.chzzk_id}`}
                    target="_blank"
                    className="flex gap-2 items-center justify-between w-full bg-gray-200 dark:bg-gray-800 rounded-md py-1 px-2 font-medium"
                  >
                    <div className="flex gap-4 items-center">
                      <div className={`avatar ${channel.openLive ? "avatar-online" : "avatar-offline"}`}>
                        <div className="w-9 rounded-full">
                          <Image src={`/${channel.image}`} width={36} height={36} alt={channel.name} />
                        </div>
                      </div>
                      <span className="font-bold dark:text-white">{channel.name}</span>
                    </div>
                    <span className="text-xs font-bold dark:text-white">
                      {channel.openLive ? "온라인" : "오프라인"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* 두 번째 카드에 마우스 이벤트 적용 */}
        <div
          className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 card-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card bg-base-100 h-full shadow-sm overflow-hidden">
            <a
              href="https://www.youtube.com/watch?v=Gr8O8fkRPpI"
              target="_blank"
              aria-label="허니즈 '사랑받을 준비완료!♡' Official MV"
              className="block w-full h-full bg-cover bg-center aspect-square lg:aspect-auto relative"
              style={{ backgroundImage: `url('/honeyz1.jpg')` }}
            >
              <div className="absolute left-0 bottom-0 text-white p-4 bg-black/50 w-full text-center card-title-overlay">사랑받을 준비완료!♡</div>
            </a>
          </div>
        </div>

        {/* 세 번째 카드에 마우스 이벤트 적용 */}

        <div
          className="relative lg:row-span-2 card-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card bg-base-100 h-full shadow-sm overflow-hidden">
            <a
              href="https://www.youtube.com/watch?v=GpTUdau8Uzs"
              target="_blank"
              aria-label="첫 만남은 계획대로 되지 않아 (TWS 투어스) | 허니즈 Cover"
              className="block w-full h-full bg-cover bg-center aspect-square lg:aspect-auto relative"
              style={{ backgroundImage: `url('/honeyz2.jpg')` }}
            >
              <div className="absolute left-0 bottom-0 text-white p-4 bg-black/50 w-full text-center card-title-overlay">첫 만남은 계획대로 되지 않아</div>
            </a>
          </div>
        </div>
      </div>


    </>
  );
}
