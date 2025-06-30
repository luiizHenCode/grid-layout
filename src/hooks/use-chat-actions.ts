import { create } from 'zustand'

interface ChatActions {
    showRecord: boolean
    setShowRecord: (show: boolean) => void
    toggleShowRecord: () => void
}

export const useChatActions = create<ChatActions>()((set) => ({
    showRecord: false,
    setShowRecord: (show) => set(() => ({ showRecord: show })),
    toggleShowRecord: () => set((state) => ({ showRecord: !state.showRecord})),
}))
