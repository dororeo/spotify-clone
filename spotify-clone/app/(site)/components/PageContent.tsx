"use client";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { useState } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";



interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs);

    const [showAllArtists, setShowAllArtists] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
    const filteredSongs = selectedArtist ? songs.filter((song) => song.artist === selectedArtist) : songs;
    const artists = Array.from(new Set(filteredSongs.map((song) => song.artist)));


    const handleArtistSelect = (artist: string) => {
        setSelectedArtist(artist);
        setShowAllArtists(false);
    };

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }
    return (
        <div>
            <div className="mb-4">
                <button
                    onClick={() => setShowAllArtists(!showAllArtists)}>
                    <br />
                    <TbAdjustmentsHorizontal size={25} className="text-neutral-400 cursor-pointer hover:text-white transition" />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {showAllArtists && (
                    <button
                        className={`${'text-white py-2 px-4 rounded-md transition bg-neutral-100/10 hover:bg-neutral-100/20 pr-4'
                            }`}
                        onClick={() => setSelectedArtist(null)}
                    >
                        View All
                    </button>
                )}

                {showAllArtists &&
                    artists.map((artist, index) => (
                        <button
                            key={index}
                            className={`${'text-white py-2 px-4 rounded-md transition bg-neutral-100/10 hover:bg-neutral-100/20 pr-4'
                                } ${selectedArtist === artist
                                    ? 'bg-neutral-100/20 hover:bg-neutral-100/20'
                                    : ' bg-neutral-100/10 hover:bg-neutral-100/20'
                                }`}
                            onClick={() => handleArtistSelect(artist)}
                        >
                            {artist}
                        </button>
                    ))
                }
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
                {filteredSongs.map((item) => (
                    <SongItem
                        key={item.id}
                        onClick={(id: string) => onPlay(id)}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default PageContent;