import { Container, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useChatStore } from '../stores/chatStore'

const Chat = () => {
  const userChats = useChatStore((state) => state.userChats)
  const setUserChats = useChatStore((state) => state.setUserChats)

  useEffect(() => {
    setUserChats()
  }, [setUserChats])

  return (
    <Container>
      <h1 fontSize={28}>Chat</h1>
      <Text>{JSON.stringify(userChats)}</Text>
    </Container>
  )
}

export default Chat
