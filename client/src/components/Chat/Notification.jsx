import { useState } from 'react'
import { useChatStore } from '../../stores/chatStore'
import { dateTransform } from '../../utils/dateTransform'
import { unreadNotificationsFunc } from '../../utils/unreadNotifications'
import NotificacionIcon from '../Icons/NotificacionIcon'

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useChatStore((state) => state.notifications)
  const allUsers = useChatStore((state) => state.allUsers)
  const markAllNotificationsAsRead = useChatStore(
    (state) => state.markAllNotificationsAsRead
  )
  const markNotificationAsRead = useChatStore(
    (state) => state.markNotificationAsRead
  )

  const unreadNotifications = unreadNotificationsFunc(notifications)
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId)

    return {
      ...n,
      senderName: sender?.name
    }
  })

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
            <h3>Notifications</h3>
            <div
              className='mark-as-read'
              onClick={() => {
                markAllNotificationsAsRead(notifications)
                setIsOpen(false)
              }}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className='notification'>No notificaction yet...</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((notification, index) => {
              return (
                <div
                  key={index}
                  className={
                    notification.isRead
                      ? 'notification'
                      : 'notification not-read'
                  }
                  onClick={() => {
                    markNotificationAsRead(notification)
                    setIsOpen(false)
                  }}
                >
                  <span>{`${notification.senderName} sent you a message`}</span>
                  <span className='notification-time'>
                    {dateTransform(notification.date)}
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
