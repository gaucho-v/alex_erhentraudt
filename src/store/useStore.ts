import { create } from "zustand";

export const useStore = create<{ addAnswer: (ans: string) => void, ansList: string[] }>((set) => ({
    ansList: [],
    addAnswer: (ans: string) => set((state: { ansList: string[] }) => ({ ansList: [...state.ansList, ans] })),
}))