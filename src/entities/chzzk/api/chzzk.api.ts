'use server';

import axios from "axios";
import { db } from "@/src/shared/lib";

export async function getChzzkClips({ chzzk_id }: { chzzk_id: string }) {
  const baseUrl = `https://api.chzzk.naver.com/service/v1/channels/${chzzk_id}/clips?filterType=WITHIN_THIRTY_DAYS&orderType=POPULAR&size=12`

  const { data } = await axios.get(baseUrl, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'NextApp',
      'Accept': 'application/json'
    }
  })
  return data
}



