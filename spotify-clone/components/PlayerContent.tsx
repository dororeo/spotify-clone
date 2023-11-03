import { useState, useEffect, useRef } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const [trackPosition, setTrackPosition] = useState(0);


    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    // update the track position as the song plays
    useEffect(() => {
        const updateTrackPosition = () => {
            if (audioRef.current.duration) {
                setTrackPosition((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
        };

        // update the track position every second
        const trackPositionInterval = setInterval(updateTrackPosition, 1000);

        // cleanup the interval on unmount
        return () => clearInterval(trackPositionInterval);
    }, []);

    // function to update the song position when the user interacts with the track slider
    const handleTrackPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPosition = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newPosition;
    };


    const resetAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
    };

    useEffect(() => {
        // cleanup any previous audio source
        resetAudio();

        // set the audio source and start playing when component is mounted
        audioRef.current.src = songUrl;
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
            });

        // add event listener to automatically play the next song when the current song ends
        audioRef.current.addEventListener('ended', onPlayNext);

        // cleanup event listener when the component unmounts
        return () => {
            audioRef.current.removeEventListener('ended', onPlayNext);
        };
    }, [songUrl]);

    const onPlayNext = () => {
        // cleanup any previous audio source
        resetAudio();

        // check if there is an active array of songs
        if (player.ids.length === 0) {
            return;
        }

        // find the current song index
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        // if the song is last in the array, reset to start with the first song in the array
        if (!nextSong) {
            player.setId(player.ids[0]);
        } else {
            player.setId(nextSong);
        }

        // start playing the new song
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                // Update the play count for the current song
                if (player.activeId) {
                }
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
            });
    };

    const onPlayPrevious = () => {
        // cleanup any previous audio source
        resetAudio();

        // check if there is an active array of songs
        if (player.ids.length === 0) {
            return;
        }

        // find the current song index
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const prevSong = player.ids[currentIndex - 1];

        // if the song is first in the array, reset to start with the last song in the array
        if (!prevSong) {
            player.setId(player.ids[player.ids.length - 1]);
        } else {
            player.setId(prevSong);
        }

        // start playing the new song
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
            });
    };

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const handlePlay = () => {
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };


    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        // Use String formatting to ensure that minutes and seconds are displayed with leading zeros if necessary
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} onClick={() => { }} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div>
                <div>
                    <div className="flex md:hidden col-auto w-full justify-end items-center">
                        <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                            <Icon size={30} className="text-black" />
                        </div>
                    </div>
                    <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                        <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayPrevious} />
                        <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                            <Icon size={30} className="text-black" />
                        </div>
                        <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayNext} />
                    </div>
                    <br />
                    <div id="slider" className="hidden h-full md:flex justify-center items-center w-full gap-x-6">
                        <div className='text-neutral-400 text-sm'>{formatTime(Math.floor(trackPosition * (audioRef.current.duration / 100)))}</div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.01"
                            value={trackPosition}
                            onChange={handleTrackPositionChange}
                            style={{
                                height: '3px',     // Adjust the height as per your preference
                                width: '80%',     // Adjust the width as per your preference
                                color: 'white',  // Set the background color to white
                                outline: 'none',   // Remove the default outline
                            }}
                        />
                        <div className='text-neutral-400 text-sm margin'>{formatTime(Math.floor(audioRef.current.duration - (trackPosition * (audioRef.current.duration / 100))))}</div>
                    </div>

                </div>
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={25} />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
