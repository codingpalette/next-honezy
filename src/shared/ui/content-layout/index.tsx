import { Header } from "../header";

interface ContentLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  explanation?: string;
  bannerImage?: string;
  tags?: string[];
}

export function ContentLayout({
  children,
  title,
  description = "즐거운 게임 플레이를 시작해보세요. 다양한 게임을 통해 재미있는 경험을 제공합니다.",
  explanation,
  bannerImage,
  tags,
}: ContentLayoutProps) {
  return (
    <>
      <Header />
      {/* Banner Section */}
      <div className="w-full h-[300px] relative">
        <img
          src={bannerImage}
          alt="Game Banner"
          className="left-0 top-0 object-cover w-full h-full brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="w-full">
        <div className="card bg-base-100 shadow mb-8">
          <div className="card-body w-full mx-auto px-4 lg:max-w-7xl lg:px-8">
            <h2 className="card-title text-2xl">게임 소개</h2>
            <p className="text-base-content">{description}</p>
            <p className="text-base-content mt-2">{explanation}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags && tags.map((tag, index) => (
                <div key={index} className="badge badge-soft badge-neutral">{tag}</div>

              ))}
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="flex justify-center pb-12">
          {children}
        </div>
      </div>
    </>
  );
}
