
'use server'

import axios from "axios"
import { PostYoutubeType } from "../type/youtube.type"
import { db } from "@/src/shared/lib"

export async function postYoutubeVideos({ channel_id }: PostYoutubeType) {
  const base_uri = "https://www.googleapis.com/youtube/v3/search" // 수정됨

  try {
    const { data } = await axios.get(base_uri, {
      params: {
        key: process.env.YOUTUBE_API_KEY,  // env에서 키 가져오기
        channelId: channel_id,
        part: "snippet,id",
        order: "date",
        maxResults: 10,
      }
    })

    // 응답 데이터에서 items 배열을 순회하며 각 동영상을 DB에 저장합니다.
    if (data.items && Array.isArray(data.items)) {
      for (const item of data.items) {
        // videoId 추출 (item.id.videoId)
        const videoId = item.id?.videoId
        if (!videoId) continue // videoId가 없으면 건너뜁니다.

        // DB에 이미 저장된 동영상이면 건너뜁니다.
        const exists = await db.youtube_videos.findUnique({
          where: { video_id: videoId },
        })
        if (exists) continue

        // 새로운 동영상 레코드 생성
        await db.youtube_videos.create({
          data: {
            video_id: videoId,
            kind: item.kind,
            etag: item.etag,
            published_at: item.snippet?.publishedAt
              ? new Date(item.snippet.publishedAt)
              : null,
            channel_id: item.snippet?.channelId,
            title: item.snippet?.title,
            description: item.snippet?.description,
            thumbnails: item.snippet?.thumbnails,
            channel_title: item.snippet?.channelTitle,
            live_broadcast_content: item.snippet?.liveBroadcastContent,
            publish_time: item.snippet?.publishTime
              ? new Date(item.snippet.publishTime)
              : null,
          },
        })
      }
    }
  } catch (error) {
    console.log("postYoutube", error)
  }
}


export async function getYoutubeVideos({ channel_id }: { channel_id: string }) {
  return await db.youtube_videos.findMany({
    where: {
      channel_id: channel_id,
    },
    orderBy: {
      published_at: "desc",
    },
    take: 12,
  })
}


export async function getYoutubeMusic({ channel_id }: { channel_id?: string }) {
  const musics = await db.youtube_music.findMany({
    // channel_id가 주어지면, members 관계에서 youtube_id가 channel_id인 레코드가 있는지 확인합니다.
    where: channel_id ? { members: { some: { youtube_id: channel_id } } } : {},
    orderBy: {
      created_at: "desc",
    },
    include: { members: true }, // 선택사항: 관계된 멤버 정보 포함
  });
  return musics;
}
