import { useState, useEffect, useRef } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import { usePlayCount } from '@/hooks/usePlayCount';
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
  const { playCounts, incrementPlayCount, getPlayCount } = usePlayCount(); // Initialize play count state

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const resetAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = '';
  };

  useEffect(() => {
    // Cleanup any previous audio source
    resetAudio();

    // Set the audio source and start playing when the component is mounted
    audioRef.current.src = songUrl;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });

    // Add event listener to automatically play the next song when the current song ends
    audioRef.current.addEventListener('ended', onPlayNext);

    // Cleanup event listener when the component unmounts
    return () => {
      audioRef.current.removeEventListener('ended', onPlayNext);
    };
  }, [songUrl]);

  const onPlayNext = () => {
    // Cleanup any previous audio source
    resetAudio();

    // Check if there is an active array of songs
    if (player.ids.length === 0) {
      return;
    }

    // Find the current song index
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    // If the song is last in the array, reset to start with the first song in the array
    if (!nextSong) {
      player.setId(player.ids[0]);
    } else {
      player.setId(nextSong);
    }

    // Start playing the new song
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        // Update the play count for the current song
        if (player.activeId) {
          incrementPlayCount(player.activeId);
        }
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });
  };

  const onPlayPrevious = () => {
    // Cleanup any previous audio source
    resetAudio();

    // Check if there is an active array of songs
    if (player.ids.length === 0) {
      return;
    }

    // Find the current song index
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    // If the song is first in the array, reset to start with the last song in the array
    if (!prevSong) {
      player.setId(player.ids[player.ids.length - 1]);
    } else {
      player.setId(prevSong);
    }

    // Start playing the new song
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        // Update the play count for the current song
        if (player.activeId) {
          incrementPlayCount(player.activeId);
        }
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });
  };

  useEffect(() => {
    audioRef.current.volume = volume; // Set the volume
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={() => { }} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover-text-white transition" onClick={onPlayPrevious} />
        <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover-text-white transition" onClick={onPlayNext} />
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
