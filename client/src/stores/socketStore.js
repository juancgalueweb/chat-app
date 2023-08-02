import { create } from 'zustand'

export const useSocketStore = create((set) => ({
  socket: null,
  onlineUsers: [],
  setSocket: (newSocket) => set({ socket: newSocket }),
  setOnlineUsers: (socketResponse) => set({ onlineUsers: socketResponse })
}))
