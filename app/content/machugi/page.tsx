import { ContentLayout } from "@/src/shared/ui";
import { Machugi } from "@/src/widgets/content";

import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허니즈로그 - 허니즈 모의고사",
  };
}


export default function MachugiPage() {
  return (

    <>

      {/* <ContentLayout */}
      {/*   title="허니즈 문제 맞추기" */}
      {/*   description="허니츄러스에게 다가오는 젤리를 하트를 쏴서 맞추는 게임 입니다." */}
      {/*   explanation="wasd 로 캐릭터를 움직이고 마우스 좌클릭으로 하트를 쏘세요." */}
      {/*   bannerImage="/content/shooting/game_start.png" */}
      {/*   tags={['허니츄러스', '젤리', '슈팅']} */}
      {/* > */}
      {/*   <Machugi /> */}
      {/* </ContentLayout> */}
      <Machugi />
    </>
  )
}

