import { useEffect, useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import { getRequest } from '../utils/services'

export const useFetchLatestMessage = (chat) => {
  const [latestMessage, setLatestMessage] = useState(null)
  const newMessage = useChatStore((state) => state.newMessage)
  const notifications = useChatStore((state) => state.notifications)

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`messages/${chat?._id}`)
      if (response.error) {
        return console.log('Error getting messages', response.error)
      }
      const { messages } = response
      const lastMessages = messages[messages.length - 1]
      setLatestMessage(lastMessages)
    }
    getMessages()
  }, [newMessage, notifications, chat])

  return { latestMessage }
}
