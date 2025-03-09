
import { postYoutubeVideos } from '@/src/entities/youtube';
import { NextResponse } from 'next/server';

export async function GET() {

  await postYoutubeVideos({ channel_id: "UCkQFRBUPh5mcF1kca4f_DvQ" })
  await postYoutubeVideos({ channel_id: "UCZcjMonq-hln97npqkYdHjQ" })
  await postYoutubeVideos({ channel_id: "UC_XRkKvydFB_wX1dlr7OHrg" })
  await postYoutubeVideos({ channel_id: "UCmNurVU0rTyYqU4W4N0Mbgg" })
  await postYoutubeVideos({ channel_id: "UC1RdgfinRXTboGZLZ4xG5Aw" })
  await postYoutubeVideos({ channel_id: "UCicn6yqObjHrCKWkKL70ALg" })
  await postYoutubeVideos({ channel_id: "UC4fuIYuwKAIw_cW7hP6jf2w" })

  return NextResponse.json({ ok: true });
}
