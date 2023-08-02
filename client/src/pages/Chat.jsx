/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { shallow } from 'zustand/shallow'
import { ChatBox } from '../components/Chat/ChatBox'
import { PotentialChats } from '../components/Chat/PotentialChats'
import { UserChat } from '../components/Chat/UserChat'
import { useChatStore } from '../stores/chatStore'
import { useSocketStore } from '../stores/socketStore'
import { useUserLoginStore } from '../stores/userLoginStore'

const Chat = () => {
  const [
    userChats,
    setUserChats,
    isUserChatsLoading,
    setCurrentChat,
    currentChat,
    setMessages
  ] = useChatStore(
    (state) => [
      state.userChats,
      state.setUserChats,
      state.isUserChatsLoading,
      state.setCurrentChat,
      state.currentChat,
      state.setMessages
    ],
    shallow
  )

  const user = useUserLoginStore((state) => state.user)

  const socket = useSocketStore((state) => state.socket)
  const setSocket = useSocketStore((state) => state.setSocket)
  const setOnlineUsers = useSocketStore((state) => state.setOnlineUsers)

  useEffect(() => {
    if (socket === null) return
    socket.emit('addNewUser', user?._id)
    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res)
    })

    return () => {
      socket.off('getOnlineUsers')
    }
  }, [socket])

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    setUserChats()
  }, [])

  useEffect(() => {
    setMessages()
  }, [currentChat])

  return (
    <Container maxW='80rem'>
      <PotentialChats />
      {userChats?.length === 0 ? (
        <Flex justifyContent='start' alignItems='center' my={5}>
          {`You haven't initialized any chat yet 😓`}
        </Flex>
      ) : (
        <Flex gap={4} my={4} flexDirection='row' justifyContent='center'>
          <Box className='messages-box' w='30%'>
            {isUserChatsLoading ? (
              <Flex justifyContent='center' alignItems='center' my={5}>
                <Spinner mr={2} />
                <span>Loading chats...</span>
              </Flex>
            ) : (
              <>
                {userChats?.map((chat) => {
                  return (
                    <div key={chat?._id} onClick={() => setCurrentChat(chat)}>
                      <UserChat chat={chat} user={user} />
                    </div>
                  )
                })}
              </>
            )}
          </Box>
          <Box w='65%' ml={10}>
            <ChatBox />
          </Box>
        </Flex>
      )}
    </Container>
  )
}

export default Chat
