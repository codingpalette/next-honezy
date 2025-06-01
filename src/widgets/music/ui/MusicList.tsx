'use client';

import { useGetYoutubeMusic } from "@/src/entities/youtube";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { youtube_music } from "@prisma/client";

export function MusicList() {
  const [selectedMember, setSelectedMember] = useState('');
  const { data, isLoading } = useGetYoutubeMusic({ channel_id: selectedMember });

  const [playingMusic, setPlayingMusic] = useState<null | youtube_music>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const playerRef = useRef<any>(null); // YouTube Player 인스턴스 저장

  // YouTube IFrame API 로드
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // YouTube API가 준비되면 호출됨
    (window as any).onYouTubeIframeAPIReady = () => {
      if (playingMusic) {
        initializePlayer(playingMusic.link);
      }
    };

    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  // 새로운 음악이 선택될 때마다 플레이어 초기화
  useEffect(() => {
    if (playingMusic && (window as any).YT?.Player) {
      initializePlayer(playingMusic.link);
    }
  }, [playingMusic]);

  // YouTube URL에서 videoId 추출
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlay = (music: youtube_music) => {
    if (playingMusic?.id === music.id) {
      if (playing) {
        playerRef.current?.pauseVideo();
        setPlaying(false);
      } else {
        playerRef.current?.playVideo();
        setPlaying(true);
      }
    } else {
      setPlayingMusic(music);
      setPlaying(true);
      setProgress(0);
      setMuted(false);

      // 플레이어가 아직 초기화되지 않았다면 초기화
      if (!playerRef.current && (window as any).YT?.Player) {
        initializePlayer(music.link, true);
        setTimeout(() => {
          playerRef.current?.playVideo();
        }, 100)
      } else if (playerRef.current) {
        playerRef.current.loadVideoById(extractVideoId(music.link));
        // 사용자 인터랙션 컨텍스트에서 즉시 재생 시도
        setTimeout(() => {
          playerRef.current?.playVideo();
        }, 100);
      }
    }
  };

  // 플레이어 초기화 함수
  const initializePlayer = (url: string, shouldPlay = false) => {
    if (playerRef.current) {
      playerRef.current.destroy(); // 기존 플레이어 제거
    }

    playerRef.current = new (window as any).YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: extractVideoId(url),
      playerVars: {
        playsinline: 1, // 모바일에서 인라인 재생
        autoplay: 0, // 자동 재생 비활성화 (모바일 호환성)
        mute: 0, // 음소거 비활성화
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: any) => {
          setDuration(event.target.getDuration());
          if (shouldPlay || playing) {
            // 사용자 인터랙션 컨텍스트에서 재생 시도
            event.target.playVideo();
          }
        },
        onStateChange: (event: any) => {
          if (event.data === (window as any).YT.PlayerState.PLAYING) {
            setPlaying(true);
            const updateProgress = () => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                setProgress(playerRef.current.getCurrentTime());
                requestAnimationFrame(updateProgress);
              }
            };
            requestAnimationFrame(updateProgress);
          } else if (event.data === (window as any).YT.PlayerState.ENDED) {
            setPlaying(false);
          } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
            setPlaying(false);
          }
        },
        onError: (event: any) => {
          console.error("YouTube Player Error:", event.data);
        },
      },
    });
  };

  // 플레이어 닫기 함수 
  const cloaePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy(); // 기존 플레이어 제거
    }
    setPlayingMusic(null);

  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 플레이어를 눌렀는데 재생이 안되고 있는 경우 
  useEffect(() => {
    if (playerRef.current && playingMusic && playing) {
      let check = true;
      let retryCount = 0;
      const maxRetries = 6; // 최대 3초 동안 시도 (500ms * 6)

      const timeInterval = setInterval(() => {
        const currentTime = playerRef.current?.getCurrentTime();
        console.log('currentTime', currentTime)
        console.log('playingMusic', playingMusic)

        if (currentTime === 0 && check && retryCount < maxRetries) {
          console.log('cccc')
          // playerRef.current?.playVideo();
          initializePlayer(playingMusic.link, true);
          retryCount++;
        } else if (currentTime > 0 || retryCount >= maxRetries) {
          check = false;
          clearInterval(timeInterval);
        }
      }, 500);

      // 컴포넌트 언마운트나 의존성 변경 시 정리
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [playerRef, playingMusic, playing])

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
                  <div className="size-10 rounded-box overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      className="object-cover w-full h-full"
                      src={music.thumbnail}
                      alt={music.title}
                      width={80}
                      height={80}
                      style={{ width: '100%', height: '100%' }}
                      priority={index < 5}
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
              <div className="text-xs sm:text-sm font-semibold truncate">{playingMusic.title}</div>
              <div className="text-xs opacity-60">{playingMusic.time}</div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                className="btn btn-ghost btn-circle btn-sm sm:btn-md"
                onClick={() => {
                  if (playing) {
                    playerRef.current?.pauseVideo();
                    setPlaying(false);
                  } else {
                    playerRef.current?.playVideo();
                    setPlaying(true);
                  }
                }}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
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
              <button
                className="btn btn-ghost btn-circle btn-sm sm:btn-md"
                onClick={() => {
                  setMuted(!muted);
                  if (playerRef.current) {
                    muted ? playerRef.current.unMute() : playerRef.current.mute();
                  }
                }}
              >
                {muted ? (
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
                      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
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
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
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
              onClick={cloaePlayer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div style={{ position: 'fixed', left: '0', top: '0', width: '150px', height: '150px' }}>
        <div id="youtube-player" style={{ width: '100%', height: '100%' }}></div>
      </div>


    </>
  );
}
