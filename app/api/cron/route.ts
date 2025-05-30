
import { postYoutubeVideos } from '@/src/entities/youtube';
import { NextResponse } from 'next/server';

export async function GET() {

  postYoutubeVideos({ channel_id: "UCkQFRBUPh5mcF1kca4f_DvQ" })
  postYoutubeVideos({ channel_id: "UCZcjMonq-hln97npqkYdHjQ" })
  postYoutubeVideos({ channel_id: "UC_XRkKvydFB_wX1dlr7OHrg" })
  postYoutubeVideos({ channel_id: "UCmNurVU0rTyYqU4W4N0Mbgg" })
  postYoutubeVideos({ channel_id: "UC1RdgfinRXTboGZLZ4xG5Aw" })
  postYoutubeVideos({ channel_id: "UCicn6yqObjHrCKWkKL70ALg" })
  postYoutubeVideos({ channel_id: "UC4fuIYuwKAIw_cW7hP6jf2w" })

  return NextResponse.json({ ok: true });
}
