/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import InputEmoji from 'react-input-emoji'
import { shallow } from 'zustand/shallow'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipients'
import { useChatStore } from '../../stores/chatStore'
import { useSocketStore } from '../../stores/socketStore'
import { useUserLoginStore } from '../../stores/userLoginStore'
import { dateTransform } from '../../utils/dateTransform'
import { SendIcon } from '../Icons/SendIcon'

export const ChatBox = () => {
  const [textMessage, setTextMessage] = useState('')
  const inputEmojiRef = useRef(null)
  const scroll = useRef(null)
  const user = useUserLoginStore((state) => state.user)
  const [
    currentChat,
    messages,
    areMessagesLoading,
    sendTextMessage,
    newMessage,
    setMessages,
    setNotifications
  ] = useChatStore(
    (state) => [
      state.currentChat,
      state.messages,
      state.areMessagesLoading,
      state.sendTextMessage,
      state.newMessage,
      state.setMessages,
      state.setNotifications
    ],
    shallow
  )
  const { recipientUser } = useFetchRecipientUser(currentChat, user)
  const socket = useSocketStore((state) => state.socket)

  const handleSendMessage = () => {
    sendTextMessage(currentChat?._id, user?._id, textMessage)
    inputEmojiRef.current.value = ''
  }

  // Send message
  useEffect(() => {
    if (socket === null) return
    const recipientId = currentChat?.members?.find((id) => id !== user?._id)
    socket.emit('sendMessage', { ...newMessage, recipientId })
  }, [newMessage])

  // Receive message and notification
  useEffect(() => {
    if (socket === null) return
    socket.on('getMessage', (res) => {
      if (currentChat?._id !== res.chatId) return
      setMessages((prev) => [...prev, res])
    })

    socket.on('getNotification', (res) => {
      setNotifications(res)
    })

    return () => {
      socket.off('getMessage')
      socket.off('getNotification')
    }
  }, [socket, currentChat])

  // Para hacer scroll hacia abajo cuando llega o se envíe un nuevo mensaje
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
                ref={scroll}
                direction='vertical'
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
      <Flex flexGrow={0} flexDir='row' className='chat-input' alignSelf='end'>
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
