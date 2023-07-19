import { Box, Container, Flex, Spacer, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { UserChat } from '../components/Chat/UserChat'
import { useChatStore } from '../stores/chatStore'
import { useUserLoginStore } from '../stores/userLoginStore'

const Chat = () => {
  const [userChats, setUserChats, isUserChatsLoading] = useChatStore(
    (state) => [state.userChats, state.setUserChats, state.isUserChatsLoading],
    shallow
  )

  const user = useUserLoginStore((state) => state.user)

  useEffect(() => {
    setUserChats()
  }, [setUserChats])

  return (
    <Container>
      {userChats?.length === 0 ? null : (
        <Flex gap={4} my={4}>
          <Box className='messages-box'>
            {isUserChatsLoading ? (
              <Flex justifyContent='center' alignItems='center' my={5}>
                <Spinner mr={2} />
                <span>Loading chats...</span>
              </Flex>
            ) : (
              <>
                {userChats?.map((chat) => {
                  return (
                    <div key={chat?._id}>
                      <UserChat chat={chat} user={user} />
                    </div>
                  )
                })}
              </>
            )}
          </Box>
          <Spacer />
          <Box>Chatbox</Box>
        </Flex>
      )}
    </Container>
  )
}

export default Chat
