import { useState } from 'react'
import { useChatStore } from '../../stores/chatStore'
// import { useUserLoginStore } from '../../stores/userLoginStore'
import { dateTransform } from '../../utils/dateTransform'
import { unreadNotificationsFunc } from '../../utils/unreadNotifications'
import NotificacionIcon from '../Icons/NotificacionIcon'

const Notification = () => {
  // const user = useUserLoginStore((state) => state.user)
  const notifications = useChatStore((state) => state.notifications)
  // const userChats = useChatStore((state) => state.userChats)
  const allUsers = useChatStore((state) => state.allUsers)

  const unreadNotifications = unreadNotificationsFunc(notifications)
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId)

    return {
      ...n,
      senderName: sender?.name
    }
  })

  console.log('unread n', unreadNotifications)
  console.log('modified n', modifiedNotifications)

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='notifications'>
      <div
        className='notifications-icon'
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <NotificacionIcon />
        {unreadNotifications?.length === 0 ? null : (
          <span className='notification-count'>
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen && (
        <div className='notifications-box'>
          <div className='notifications-header'>
            <h3 style={{ color: '#fff' }}>Notifications</h3>
            <div className='mark-as-read' style={{ color: '#fff' }}>
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className='notification'>No notificaction yet...</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? 'notification' : 'notification not-read'
                  }
                >
                  <span
                    style={{ color: '#fff' }}
                  >{`${n.senderName} sent you a message`}</span>
                  <span className='notification-time'>
                    {dateTransform(n.date)}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Notification
