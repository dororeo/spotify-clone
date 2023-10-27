import { create } from 'zustand';

interface UploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useUploadModal = create<UploadModalStore>((set) => ({ //extract set function to return immediate obj
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));

export default useUploadModal;