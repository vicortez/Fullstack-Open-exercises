import { useNotificationValue } from '../context/notification/NotificationContext'

const Notification = () => {
  const notificationText = useNotificationValue()
  if (notificationText) {
    return <div>{notificationText}</div>
  }
  return <div>{notificationText}</div>
}
export default Notification
