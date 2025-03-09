'use server';



import { MainLayou } from "@/src/shared/ui";
import { MusicList } from "@/src/widgets/music";
import { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  return {
    title: '허니즈로그 - MUSIC',
  }
}


export default async function MusicPage() {
  return (
    <>
      <MainLayou>
        <MusicList />
        <div>111</div>
      </MainLayou>
    </>
  )


}
