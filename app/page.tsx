
import { channels, db } from "@/src/shared/lib";
import { MainLayou } from "@/src/shared/ui";
import { BentoItems, ChzzkClips, YoutubeVideo } from "@/src/widgets/main";
import Image from "next/image";

// 페이지가 동적으로 렌더링되도록 강제
export const dynamic = "force-dynamic";

export default async function Home() {
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
          cache: 'no-cache', // 여전히 동적 데이터를 가져옴
          // next: { revalidate: 3600 }, // 1시간마다 데이터 갱신
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


  return (
    <>
      <MainLayou>
        <BentoItems channelsWithLive={channelsWithLive} />
        <YoutubeVideo channel_id="UCkQFRBUPh5mcF1kca4f_DvQ" />
        <ChzzkClips channel_id="c0d9723cbb75dc223c6aa8a9d4f56002" />
      </MainLayou>
    </>
  );
}

