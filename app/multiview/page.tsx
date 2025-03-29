// src/app/multiview/page.tsx
'use client';

import { Channel } from "@/src/shared/lib";
import { channels } from "@/src/shared/lib";
import Image from "next/image";
import { useState } from "react";

export default function MultiviewPage() {
  // 선택된 스트리머 목록 (최대 4개까지 표시하도록 설정)
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  // 음성 켜진 스트리머 (하나만 음성 재생 가능)
  const [audioChannel, setAudioChannel] = useState<string | null>(null);

  // 스트리머 선택/해제 핸들러
  const handleSelectChannel = (channel: Channel) => {
    if (selectedChannels.some((ch) => ch.chzzk_id === channel.chzzk_id)) {
      // 이미 선택된 경우 제거
      setSelectedChannels(
        selectedChannels.filter((ch) => ch.chzzk_id !== channel.chzzk_id)
      );
      if (audioChannel === channel.chzzk_id) {
        setAudioChannel(null); // 음성도 해제
      }
    } else if (selectedChannels.length < 4) {
      // 최대 4개까지 추가
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  // 음성 토글 핸들러
  const toggleAudio = (chzzk_id: string) => {
    if (audioChannel === chzzk_id) {
      setAudioChannel(null); // 음성 끄기
    } else {
      setAudioChannel(chzzk_id); // 음성 켜기
    }
  };

  return (
    <div className="w-full h-screen bg-black p-4">

      {/* 멤버 선택 버튼 */}
      <ul className="flex gap-4 items-center flex-wrap mb-6">
        {channels.map((member) => (
          <li key={member.chzzk_id}>
            <button
              type="button"
              className={`w-[40px] h-[40px] rounded-full overflow-hidden border-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${selectedChannels.some((ch) => ch.chzzk_id === member.chzzk_id)
                ? "border-green-600"
                : "border-gray-600"
                }`}
              onClick={() => handleSelectChannel(member)}
            >
              <Image src={`/${member.image}`} width={40} height={40} alt={member.name} />

            </button>
          </li>
        ))}
      </ul>

      {/* 멀티뷰 레이아웃 */}
      <div className="grid grid-cols-2 gap-4 h-[80vh]">
        {selectedChannels.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center text-gray-500">
            맴버를 선택해주세요.
          </div>
        ) : (
          selectedChannels.map((channel) => (
            <div
              key={channel.chzzk_id}
              className="relative bg-black rounded-lg overflow-hidden"
            >
              {/* 치지직 스트리밍 iframe */}
              <iframe
                src={`https://chzzk.naver.com/live/${channel.chzzk_id}`}
                className="w-full h-full"
                allowFullScreen
              />

              {/* 스트리머 이름 및 음성 버튼 */}
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <span className="text-white font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
                  {channel.name}
                </span>
                <button
                  className={`btn btn-sm ${audioChannel === channel.chzzk_id ? "btn-success" : "btn-ghost"
                    }`}
                  onClick={() => toggleAudio(channel.chzzk_id)}
                >
                  {audioChannel === channel.chzzk_id ? "음성 끄기" : "음성 켜기"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
