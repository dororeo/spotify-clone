import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getSongsByPlayCount = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    try {
        // fetch songs by play_count in ascending order
        const { data, error } = await supabase.from('songs').select('*').order('play_count', { ascending: false });

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

export default getSongsByPlayCount;
