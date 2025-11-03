import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {
  const { message, type } = useNotificationValue()

  const notificationClassType = type === 'error' ? 'red-notification' : 'green-notification'

  if (message) {
    return <div className={`notification ${notificationClassType}`}>{message}</div>
  } else {
    return null
  }
}

export default Notification
