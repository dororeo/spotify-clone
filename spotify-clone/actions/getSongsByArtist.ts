import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByArtist = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    // Fetch songs by artist in ascending order (modify the 'artist' to match your column name)
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("artist", { ascending: true });

    if (error) {
      console.error("Error fetching songs:", error);
      return [];
    }

    return (data as Song[]) || [];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export default getSongsByArtist;
