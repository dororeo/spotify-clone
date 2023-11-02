"use client";

import { TbAdjustmentsHeart } from "react-icons/tb";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface TopTracksProps {
    songs: Song[];
}

const TopTracks: React.FC<TopTracksProps> = ({
    songs
}) => {

    const uploadModal = useUploadModal();
    const authModal = useAuthModal();
    const { user, subscription } = useUser();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        //to do: check for subscription
        return uploadModal.onOpen();
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbAdjustmentsHeart size={26} className="text-neutral-400" />
                    <p className="text-neutral-400 font-medium text-md">
                        Top Tracks
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.slice(0, 5).map((item) => { // map the first 5 items
                    console.log('Song Data:', item);
                    return (
                        <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item} />
                    );
                })}
            </div>
        </div>
    );
}

export default TopTracks;