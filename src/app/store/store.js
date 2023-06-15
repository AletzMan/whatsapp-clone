import { create } from 'zustand'

export const useStore = create((set) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set((state) => ({ selectedChat: chat })),
}))
