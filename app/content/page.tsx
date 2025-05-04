
import { MainLayou } from "@/src/shared/ui";
import { GameCard } from "@/src/widgets/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허니즈로그 - 콘텐츠",
  description: "허니즈의 다양한 컨텐츠를 즐겨보세요.",
  keywords: "허니즈로그, 허니즈, 컨텐트, 게임, 허니츄러스, 아야, 담유이, 디디디용, 오화요, 망내, 젤리, 슈팅",
};

const games = [
  {
    id: "machugi",
    title: "허니즈 모의고사",
    description: `허니츄러스에 대한 다양한 질문을 풀어보세요!`,
    image: "",
    tags: ["퀴즈", "허니즈"],
  },
  {
    id: "shooting",
    title: "안아줘요 허츄!",
    description: `허니츄러스에게 다가오는 젤리를 하트를 쏴서 맞추는 게임입니다.`,
    image: "/content/shooting/game_start.png",
    tags: ["슈팅", "허니츄러스", "젤리"],
  },
  {
    id: "coming-soon",
    title: "준비 중",
    description: "새로운 게임이 준비 중입니다. 조금만 기다려주세요!",
    image: "/content/coming-soon.svg",
    tags: ["준비중"],
    disabled: true,
  },
];

export default async function ContentPage() {
  return (
    <>
      <MainLayou>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              tags={game.tags}
              disabled={game.disabled}
            />
          ))}
        </div>
      </MainLayou>
    </>
  );
}
