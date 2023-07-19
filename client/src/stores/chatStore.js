import { create } from 'zustand'
import { useUserLoginStore } from '../stores/userLoginStore'
import { getRequest } from '../utils/services'

export const useChatStore = create((set) => ({
  userChats: null,
  isUserChatsLoading: false,
  userChatError: null,
  setUserChats: () => {
    const { user } = useUserLoginStore.getState()
    if (user?.id !== '') {
      set({ isUserChatsLoading: true })
      setTimeout(async () => {
        const response = await getRequest(`chats/${user?._id}`)
        if (response.error) {
          set({ userChatError: response.errorMsg })
          set({ isUserChatsLoading: false })
        } else {
          set({ userChats: response.chats, userChatError: null })
          set({ isUserChatsLoading: false })
        }
      }, 1000)
    }
  }
}))
