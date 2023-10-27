import { create } from 'zustand';

interface AuthModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useAuthModal = create<AuthModalStore>((set) => ({ //extract set function to return immediate obj
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));

export default useAuthModal;