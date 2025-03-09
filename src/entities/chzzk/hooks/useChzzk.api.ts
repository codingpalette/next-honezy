import { useQuery } from "@tanstack/react-query";
import { getChzzkClips } from "../api/chzzk.api";






export function useGetChzzkClips({ chzzk_id }: { chzzk_id: string }) {
  return useQuery({
    queryKey: ["chzzk_clips", chzzk_id],
    queryFn: () => getChzzkClips({ chzzk_id }),
    enabled: !!chzzk_id,
  })


}


