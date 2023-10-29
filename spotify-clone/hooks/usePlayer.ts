import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

//click play, set a list of ids which are going to play in a playlist, and current clicked id = start of 'playlist'
const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined })

}));

export default usePlayer;