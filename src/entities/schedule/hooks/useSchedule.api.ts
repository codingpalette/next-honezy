import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNodeList, getScheduleList } from "../api/schedule.api";


export function useGetScheduleList({ date }: { date: string }) {
  const queryClient = useQueryClient();
  //
  // return useQuery(["schedule", date], async () => {
  //   const data = await getScheduleList({ date });
  //   return data;
  // }, {
  //   initialData: () => {
  //     return queryClient.getQueryData(["schedule", date]);
  //   },
  // });

  return useQuery({
    queryKey: ["schedule", date],
    queryFn: () => getScheduleList({ date }),
    initialData: () => {
      return queryClient.getQueryData(["schedule", date]);
    }
  })
}


export function useGetNodeList({ memberIds, keyword }: { memberIds: number[], keyword: string }) {
  return useQuery({
    queryKey: ["node", memberIds, keyword],
    queryFn: () => getNodeList({ memberIds, keyword }),
  })
}

