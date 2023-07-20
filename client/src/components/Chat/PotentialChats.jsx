import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { useChatStore } from '../../stores/chatStore'
import { useUserLoginStore } from '../../stores/userLoginStore'

export const PotentialChats = () => {
  const user = useUserLoginStore((state) => state.user)
  const [potentialChats, setPotentialChats, setCreateChat, userChats] =
    useChatStore(
      (state) => [
        state.potentialChats,
        state.setPotentialChats,
        state.setCreateChat,
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
                onClick={async () => setCreateChat(user?._id, u?._id)}
              >
                {u?.name}
                <span className='user-online'></span>
              </div>
            )
          })}
      </div>
    </>
  )
}
