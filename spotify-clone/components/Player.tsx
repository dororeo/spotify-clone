"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {

    //fetch song using id assigned in player store
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!); //! --> song is not null

    //don't load player if there is no song playing
    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (  
        <div  className="fied bottom-0 bg-black w-full py-2 h-[80px] px-4">
            <PlayerContent song={song} songUrl={songUrl} key={songUrl}/> {/* key is used to reset the entire hook */}
        </div>
    );
}
 
export default Player;