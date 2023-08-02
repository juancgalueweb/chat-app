import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { useChatStore } from '../../stores/chatStore'
import { useSocketStore } from '../../stores/socketStore'
import { useUserLoginStore } from '../../stores/userLoginStore'

export const PotentialChats = () => {
  const user = useUserLoginStore((state) => state.user)
  const onlineUsers = useSocketStore((state) => state.onlineUsers)
  const [potentialChats, setPotentialChats, createChat, userChats] =
    useChatStore(
      (state) => [
        state.potentialChats,
        state.setPotentialChats,
        state.createChat,
        state.userChats
      ],
      shallow
    )

  useEffect(() => {
    setPotentialChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChats])

  return (
    <>
      <div className='all-users' style={{ marginTop: '20px' }}>
        {potentialChats &&
          potentialChats.map((u) => {
            return (
              <div
                key={u?._id}
                className='single-user'
                onClick={async () => createChat(user?._id, u?._id)}
              >
                {u?.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? 'user-online'
                      : ''
                  }
                ></span>
              </div>
            )
          })}
      </div>
    </>
  )
}
