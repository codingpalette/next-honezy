'use server'


import { ContentLayout, MainLayou } from "@/src/shared/ui";
import { ShootingGame } from "@/src/widgets/content";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허니즈로그 - 안아줘요 허츄!",
    description: "허니츄러스에게 다가오는 젤리를 하트를 쏴서 맞추는 게임 입니다.",
    keywords: "허니츄러스, 젤리, 슈팅, 게임",
  };
}

export default async function ShootingPage() {
  return (
    <>
      <ContentLayout
        title="안아줘요 허츄!"
        description="허니츄러스에게 다가오는 젤리를 하트를 쏴서 맞추는 게임 입니다."
        bannerImage="/content/shooting/game_start.png"
        tags={['허니츄러스', '젤리', '슈팅']}
      >
        <ShootingGame />
      </ContentLayout>

    </>
  )
}
