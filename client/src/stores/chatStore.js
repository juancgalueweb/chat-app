import { create } from 'zustand'
import { useUserLoginStore } from '../stores/userLoginStore'
import { getRequest, postRequest } from '../utils/services'

export const useChatStore = create((set, get) => ({
  userChats: null,
  isUserChatsLoading: false,
  userChatError: null,
  potentialChats: [],
  currentChat: null,
  messages: null,
  areMessagesLoading: false,
  messagesError: null,
  allUsers: [],
  newMessage: '',
  notifications: [],
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
    set({ allUsers: users })
  },
  createChat: async (firstId, secondId) => {
    const response = await postRequest('chats', { firstId, secondId })
    set({ isUserChatsLoading: true })
    if (response?.error) {
      set({ userChatError: response?.errorMsg })
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
    set({ isUserChatsLoading: false })
  },
  setMessages: async () => {
    const { currentChat } = get()
    if (currentChat != null) {
      const response = await getRequest(`messages/${currentChat?._id}`)
      set({ areMessagesLoading: true })
      if (response?.error) {
        set({ messagesError: response?.errorMsg })
        set({ areMessagesLoading: false })
        return
      }
      set({ messages: response?.messages })
      set({ areMessagesLoading: false })
    }
  },
  sendTextMessage: async (chatId, senderId, text) => {
    if (!text) return
    const body = {
      chatId,
      senderId,
      text
    }
    const postReq = await postRequest('messages', body)
    set({ newMessage: postReq.response })
    const { setMessages } = get()
    setMessages((prev) => [...prev, postReq.response])
  },
  setNotifications: (res) => {
    const { currentChat, notifications } = get()
    const isChatOpen = currentChat?.members.some((id) => id === res.senderId)

    if (isChatOpen) {
      set({ notifications: [...notifications, { ...res, isRead: true }] })
    } else {
      set({ notifications: [res, ...notifications] })
    }
  },
  markAllNotificationsAsRead: (notifications) => {
    const markedNotifications = notifications.map((notification) => {
      return { ...notification, isRead: true }
    })
    set({ notifications: markedNotifications })
  },
  markNotificationAsRead: (notification) => {
    const { userChats, notifications, setCurrentChat } = get()
    const { user } = useUserLoginStore.getState()

    // Find chat to open
    const desiredChat = userChats.find((chat) => {
      const chatMembers = [user?._id, notification.senderId]
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member)
      })
      return isDesiredChat
    })

    // Mark notification as read
    const mNotifications = notifications.map((el) => {
      if (notification.senderId === el.senderId) {
        return { ...notification, isRead: true }
      } else {
        return el
      }
    })

    setCurrentChat(desiredChat)
    set({ notifications: mNotifications })
  },
  markThisUserNotificationsAsRead: (thisUserNotifications) => {
    const { notifications } = get()
    const mNotifications = notifications.map((el) => {
      const matchedNotifications = thisUserNotifications.find(
        (n) => n.senderId === el.senderId
      )
      if (matchedNotifications) {
        return { ...el, isRead: true }
      }
      return el
    })
    set({ notifications: mNotifications })
  }
}))
