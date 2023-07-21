import { Flex, Spinner } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipients'
import { useChatStore } from '../../stores/chatStore'
import { useUserLoginStore } from '../../stores/userLoginStore'
import { dateTransform } from '../../utils/dateTransform'

export const ChatBox = () => {
  const user = useUserLoginStore((state) => state.user)
  const [currentChat, messages, areMessagesLoading] = useChatStore(
    (state) => [state.currentChat, state.messages, state.areMessagesLoading],
    shallow
  )
  const { recipientUser } = useFetchRecipientUser(currentChat, user)

  if (!recipientUser) {
    return (
      <p style={{ textAlign: 'center', width: '100%' }}>
        No conversation selected yet
      </p>
    )
  }

  if (areMessagesLoading) {
    return (
      <Flex justifyContent='center' alignItems='center'>
        <Spinner mr={2} />
        <span>Loading messages...</span>
      </Flex>
    )
  }

  return (
    <Flex gap={4} flexDirection='column' className='chat-box' flex='1'>
      <div className='chat-header'>
        <strong>{recipientUser?.name}</strong>
      </div>
      <Flex gap={3} className='messages'>
        {messages &&
          messages.map((message, index) => {
            return (
              <Flex
                key={index}
                flexDirection='column'
                className={`${
                  message.senderId === user?._id ? 'message-self' : 'message'
                }`}
              >
                <span>{message?.text}</span>
                <span className='message-footer'>
                  {dateTransform(message?.createdAt)}
                </span>
              </Flex>
            )
          })}
      </Flex>
    </Flex>
  )
}
