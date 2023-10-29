import { useState, useEffect } from 'react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface PlayCountStore {
  playCounts: Record<string, number>;
  incrementPlayCount: (songId: string) => void;
  getPlayCount: (songId: string) => number;
}

export function usePlayCount(): PlayCountStore {
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const supabaseClient = useSupabaseClient();

  // Fetch play counts from the "songs" table when the component mounts
  useEffect(() => {
    async function fetchPlayCounts() {
      const { data, error } = await supabaseClient.from('songs')
        .select('id, play_count');

      if (data) {
        // Map the data to your state
        const counts = data.reduce((acc, entry) => {
          acc[entry.id] = entry.play_count;
          return acc;
        }, {} as Record<string, number>);
        setPlayCounts(counts);
      }
      if (error) {
        console.error('Error fetching play counts:', error);
      }
    }

    fetchPlayCounts();
  }, []);

  // Increment play count locally and update the "songs" table in the database
  const incrementPlayCount = (songId: string) => {
    setPlayCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[songId] = (prevCounts[songId] || 0) + 1;

      // Update the "songs" table with the new play count
      supabaseClient
        .from('songs')
        .upsert([
          {
            id: songId,
            play_count: updatedCounts[songId],
          },
        ]);

      return updatedCounts;
    });
  };

  const getPlayCount = (songId: string) => {
    return playCounts[songId] || 0;
  };

  return { playCounts, incrementPlayCount, getPlayCount };
}
