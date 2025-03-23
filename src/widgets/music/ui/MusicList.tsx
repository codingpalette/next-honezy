// src/widgets/music/ui/MusicList.tsx
'use client';

import { useGetYoutubeMusic } from "@/src/entities/youtube";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { youtube_music } from "@prisma/client";

export function MusicList() {
  const [selectedMember, setSelectedMember] = useState('');
  const { data, isLoading } = useGetYoutubeMusic({ channel_id: selectedMember });

  const [playingMusic, setPlayingMusic] = useState<null | youtube_music>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);

  const handlePlay = (music: youtube_music) => {
    if (playingMusic?.id === music.id) {
      setPlaying(!playing);
    } else {
      setPlayingMusic(music);
      setPlaying(true);
      setProgress(0);
    }
  };

  // playingMusic 변경 시 재생 상태 동기화
  useEffect(() => {
    if (playingMusic && !playing) {
      setPlaying(true); // 재생 시작 보장
    }
  }, [playingMusic]);

  // ReactPlayer 준비 완료 시 재생 시작
  const handleReady = () => {
    if (playing && playerRef.current) {
      playerRef.current.seekTo(0); // 처음부터 재생
    }
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="pb-12">
        {/* 멤버 선택 버튼 */}
        <ul className="flex gap-4 items-center flex-wrap">
          <li>
            <button
              type="button"
              className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${selectedMember === '' ? 'border-green-600' : 'border-gray-600'}`}
              onClick={() => setSelectedMember('')}
            >
              <Image src={`/honeyz.jpg`} width={40} height={40} alt="허니즈" />
            </button>
          </li>
          {channels.map((member) => (
            <li key={member.youtube_id}>
              <button
                type="button"
                className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${member.youtube_id === selectedMember ? 'border-green-600' : 'border-gray-600'}`}
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
              Array(10).fill(0).map((_, index) => (
                <li className="list-row" key={index}>
                  <div className="skeleton h-10 w-[50px]"></div>
                  <div className="skeleton size-10 rounded-box"></div>
                  <div className="list-col-grow flex flex-col gap-2">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-3 w-1/4"></div>
                  </div>
                  <div className="skeleton h-10 w-10 rounded-box"></div>
                  <div className="skeleton h-10 w-10 rounded-box"></div>
                </li>
              ))
            ) : (
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
                  <div>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handlePlay(music)}
                    >
                      {playingMusic?.id === music.id && playing ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <a href={music.link} target="_blank">
                    <button className="btn btn-square btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </button>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* 음악 재생 바 */}
      {playingMusic && (
        <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-2 shadow-lg z-50">
          <div className="flex items-center gap-2 sm:gap-4 max-w-screen-xl mx-auto">
            <div className="size-10 sm:size-12 rounded-box overflow-hidden flex-shrink-0">
              <img
                className="object-cover w-full h-full"
                src={playingMusic.thumbnail}
                alt={playingMusic.title}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold truncate">
                {playingMusic.title}
              </div>
              <div className="text-xs opacity-60">{playingMusic.time}</div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                className="btn btn-ghost btn-circle btn-sm sm:btn-md"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 hidden sm:flex items-center gap-2">
              <span className="text-xs">{formatTime(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                value={progress}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  setProgress(newTime);
                  if (playerRef.current) {
                    playerRef.current.seekTo(newTime);
                  }
                }}
                className="range range-primary range-xs flex-1"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
            <button
              className="btn btn-ghost btn-circle btn-sm sm:btn-md flex-shrink-0"
              onClick={() => setPlayingMusic(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* 플레이어 숨김 처리: display: none 대신 보이지 않지만 렌더링 유지 */}
          <div >
            <ReactPlayer
              ref={playerRef}
              url={playingMusic.link}
              playing={playing}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={() => setPlaying(false)}
              onReady={() => {
                setTimeout(() => {
                  handleReady()
                }, 1000)

              }}
              width="300"
              height="150"
              config={{
                youtube: {
                  playerVars: { playsinline: 1 },
                },
              } as any}
            />
          </div>
        </div>
      )}
    </>
  );
}
