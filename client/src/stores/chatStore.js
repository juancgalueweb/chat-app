import { create } from 'zustand'
import { useUserLoginStore } from '../stores/userLoginStore'
import { getRequest, postRequest } from '../utils/services'

export const useChatStore = create((set, get) => ({
  userChats: null,
  isUserChatsLoading: false,
  userChatError: null,
  potentialChats: [],
  currentChat: null,
  setUserChats: async () => {
    const { user } = useUserLoginStore.getState()
    if (user?.id !== '') {
      set({ isUserChatsLoading: true })
      const response = await getRequest(`chats/${user?._id}`)
      if (response.error) {
        set({ userChatError: response.errorMsg })
        set({ isUserChatsLoading: false })
      } else {
        set({ userChats: response.chats, userChatError: null })
        set({ isUserChatsLoading: false })
      }
    }
  },
  setPotentialChats: async () => {
    const { user } = useUserLoginStore.getState()
    const response = await getRequest('users')
    set({ isUserChatsLoading: true })
    if (response.error) {
      set({ userChatError: response.errorMsg })
      set({ isUserChatsLoading: false })
      return
    }
    const { users } = response
    const pChats = users.filter((u) => {
      const { userChats } = get()
      let isChatCreated = false
      if (user?._id === u._id) {
        set({ isUserChatsLoading: false })
        return false
      }
      if (userChats) {
        isChatCreated = userChats?.some((chat) => {
          set({ isUserChatsLoading: false })
          return chat.members[0] === u._id || chat.members[1] === u._id
        })
      }
      set({ isUserChatsLoading: false })
      return !isChatCreated
    })
    set({ potentialChats: pChats })
  },
  createChat: async (firstId, secondId) => {
    const response = await postRequest('chats', { firstId, secondId })
    set({ isUserChatsLoading: true })
    if (response?.error) {
      set({ userChatError: response.errorMsg })
      set({ isUserChatsLoading: false })
      return
    }
    const { setUserChats } = get()
    const { chat } = response
    setUserChats((prev) => [...prev, chat])
    set({ chat })
  },
  setCurrentChat: (chat) => {
    set({ currentChat: chat })
  }
}))
