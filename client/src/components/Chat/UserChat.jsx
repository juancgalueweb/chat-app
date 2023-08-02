import { Flex } from '@chakra-ui/react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipients'
import { useSocketStore } from '../../stores/socketStore'
import { Male1 } from '../Avatar/Male1'

export const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user)
  const onlineUsers = useSocketStore((state) => state.onlineUsers)

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  )

  return (
    <Flex
      flexDirection='row'
      gap={3}
      alignItems='center'
      p={2}
      justifyContent='space-between'
      className='user-card'
      role='button'
    >
      <Flex>
        <div className='avatar'>
          <Male1 />
        </div>
        <div className='text-content'>
          <div className='name'>{recipientUser?.name}</div>
          <div className='text'>Text message</div>
        </div>
      </Flex>
      <Flex flexDirection='column' alignItems='end'>
        <div className='date'>12/12/2022</div>
        <div className='this-user-notifications'>2</div>
        <span className={isOnline ? 'user-online' : ''}></span>
      </Flex>
    </Flex>
  )
}
