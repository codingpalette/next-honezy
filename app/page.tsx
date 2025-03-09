'use server'

import { channels, db } from "@/src/shared/lib";
import { MainLayou } from "@/src/shared/ui";
import { BentoItems, ChzzkClips, YoutubeVideo } from "@/src/widgets/main";
import Image from "next/image";
// import styles from "./page.module.css";

export default async function Home() {



  // 모든 채널에 대해 비동기로 API 호출 후 openLive 결과를 채널 객체에 추가


  const channelsWithLive = await Promise.all(
    channels.map(async (channel) => {
      const url = `https://api.chzzk.naver.com/service/v1/channels/${channel.chzzk_id}`;
      try {
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'NextApp',
            'Accept': 'application/json'
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return { ...channel, openLive: data.content.openLive };
      } catch (error) {
        console.error(`Error fetching channel ${channel.chzzk_id}: `, error);
        return { ...channel, openLive: null };
      }
    })
  );


  // console.log("channelsWithLive", channelsWithLive);
  // const honeychurros = await db.youtube_videos.findMany({
  //   where: {
  //     channel_id: 'UCkQFRBUPh5mcF1kca4f_DvQ'
  //   },
  //   orderBy: {
  //     published_at: 'desc'
  //   },
  //   take: 12
  // })


  return (
    <>
      <MainLayou>
        <div className="mt-20" />
        <BentoItems channelsWithLive={channelsWithLive} />
        <YoutubeVideo channel_id="UCkQFRBUPh5mcF1kca4f_DvQ" />
        <ChzzkClips channel_id="c0d9723cbb75dc223c6aa8a9d4f56002" />
      </MainLayou>
    </>
  );
}
