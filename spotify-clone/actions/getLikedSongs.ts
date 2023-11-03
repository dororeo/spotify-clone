import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  //server component supabase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  //get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //fetch liked songs from logged in user
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.songs, //spreading relation with the one song being loaded
  }));
};

export default getLikedSongs;
