'use client'

import { youtube_music } from "@prisma/client"
import { useEffect, useRef } from "react"
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MusidModalProps {
  playingMusic: null | youtube_music
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  onClose: () => void
  playing: boolean
  progress: number
  duration: number
  onProgressChange: (time: number) => void
  formatTime: (seconds: number) => string
}

export function MusidModal({
  playingMusic,
  onPlayPause,
  onPrevious,
  onNext,
  onClose,
  playing,
  progress,
  duration,
  onProgressChange,
  formatTime
}: MusidModalProps) {
  const recordRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (recordRef.current) {
      gsap.to(recordRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
        paused: !playing
      });
    }
  }, [playing]);

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
          </form>
          <h3 className="font-bold text-lg">{playingMusic?.title}</h3>
          <div className="mt-8 w-full flex items-center justify-center">
            <div className="relative w-64 h-64">
              <img
                ref={recordRef}
                src={playingMusic?.thumbnail}
                className="w-full h-full rounded-full object-cover"
              />
              {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"> */}
              {/* </div> */}
            </div>
          </div>

          {/* 재생바 */}
          <div className="w-full mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs">{formatTime(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                value={progress}
                onChange={(e) => onProgressChange(Number(e.target.value))}
                className="range range-primary range-xs flex-1"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className={`btn btn-circle ${!playingMusic ? 'btn-disabled' : 'btn-ghost'}`}
              disabled={!playingMusic}
              onClick={onPrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              onClick={onPlayPause}
            >
              {playing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              )}
            </button>

            <button
              className={`btn btn-circle ${!playingMusic ? 'btn-disabled' : 'btn-ghost'}`}
              disabled={!playingMusic}
              onClick={onNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
