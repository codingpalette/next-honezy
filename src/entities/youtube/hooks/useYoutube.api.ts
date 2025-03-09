import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideos } from "../api/youtube.api";
import { youtube_videos } from "@prisma/client";



interface useGetYoutubeVideosProps {
  channel_id: string;
  initialData?: youtube_videos[];
}

export function useGetYoutubeVideos({ channel_id, initialData }: useGetYoutubeVideosProps) {
  return useQuery({
    queryKey: ["youtubeVideos", channel_id],
    queryFn: () => getYoutubeVideos({ channel_id }),
    enabled: !!channel_id,
    // initialData
  })

}
