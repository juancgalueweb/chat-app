import { Flex, Spinner } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import InputEmoji from 'react-input-emoji'
import { shallow } from 'zustand/shallow'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipients'
import { useChatStore } from '../../stores/chatStore'
import { useUserLoginStore } from '../../stores/userLoginStore'
import { dateTransform } from '../../utils/dateTransform'
import { SendIcon } from '../Icons/SendIcon'

export const ChatBox = () => {
  const [textMessage, setTextMessage] = useState('')
  const inputEmojiRef = useRef(null)
  const user = useUserLoginStore((state) => state.user)
  const [currentChat, messages, areMessagesLoading, sendTextMessage] =
    useChatStore(
      (state) => [
        state.currentChat,
        state.messages,
        state.areMessagesLoading,
        state.sendTextMessage
      ],
      shallow
    )
  const { recipientUser } = useFetchRecipientUser(currentChat, user)

  const handleSendMessage = () => {
    sendTextMessage(currentChat?._id, user?._id, textMessage)
    inputEmojiRef.current.value = ''
  }

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
    <Stack gap={4} className='chat-box'>
      <div className='chat-header'>
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className='messages'>
        {messages &&
          messages.map((message, index) => {
            return (
              <Stack
                flexDirection='column'
                key={index}
                className={`${
                  message.senderId === user?._id
                    ? 'message self align-self-end flex-grow-0'
                    : 'message align-self-start flex-grow-0'
                }`}
              >
                <span>{message?.text}</span>
                <span className='message-footer'>
                  {dateTransform(message?.createdAt)}
                </span>
              </Stack>
            )
          })}
      </Stack>
      <Flex
        flexGrow={0}
        flexDirection='row'
        className='chat-input'
        alignSelf='end'
      >
        <InputEmoji
          ref={inputEmojiRef}
          value={textMessage}
          borderColor='#0EA5DF'
          onChange={setTextMessage}
          onEnter={handleSendMessage}
        />
        <button onClick={() => handleSendMessage()}>
          <SendIcon />
        </button>
      </Flex>
    </Stack>
  )
}
