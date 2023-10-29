import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    //get player
    const player = usePlayer();

    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id:string) => {
        if(!user) {
            return authModal.onOpen();
        }
        //play song that is being clicked and create queue of songs from location of clicked song
        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;