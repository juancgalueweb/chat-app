import { Flex } from '@chakra-ui/react'
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipients'
import { useChatStore } from '../../stores/chatStore'
import { useSocketStore } from '../../stores/socketStore'
import { dateTransform } from '../../utils/dateTransform'
import { unreadNotificationsFunc } from '../../utils/unreadNotifications'
import { Male1 } from '../Avatar/Male1'

export const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user)
  const onlineUsers = useSocketStore((state) => state.onlineUsers)
  const notifications = useChatStore((state) => state.notifications)
  const markThisUserNotificationsAsRead = useChatStore(
    (state) => state.markThisUserNotificationsAsRead
  )
  const { latestMessage } = useFetchLatestMessage(chat)
  const unreadNotifications = unreadNotificationsFunc(notifications)
  const thisUserNotification = unreadNotifications?.filter(
    (notification) => notification?.senderId === recipientUser?._id
  )

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  )

  const handleClick = () => {
    if (thisUserNotification.length !== 0) {
      markThisUserNotificationsAsRead(thisUserNotification)
    }
  }

  const truncateText = (text) => {
    let shortText = text.substring(0, 20)
    if (text.length > 20) {
      shortText = shortText + '...'
    }
    return shortText
  }

  return (
    <Flex
      flexDirection='row'
      gap={3}
      alignItems='center'
      p={2}
      justifyContent='space-between'
      className='user-card'
      role='button'
      onClick={handleClick}
    >
      <Flex>
        <div className='avatar'>
          <Male1 />
        </div>
        <div className='text-content'>
          <div className='name'>{recipientUser?.name}</div>
          <div className='text'>
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </Flex>
      <Flex flexDirection='column' alignItems='end'>
        <div className='date'>
          {latestMessage
            ? dateTransform(latestMessage?.createdAt)
            : 'No hay chats'}
        </div>
        <div
          className={
            thisUserNotification?.length > 0 ? 'this-user-notifications' : ''
          }
        >
          {thisUserNotification?.length > 0 && thisUserNotification.length}
        </div>
        <span className={isOnline ? 'user-online' : ''}></span>
      </Flex>
    </Flex>
  )
}
