import { use } from 'react'
import { NotificationContext } from '../context/NotificationContext'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 10,
}

const Notification = () => {
  const { message } = use(NotificationContext)

  return message && <div style={style}>{message}</div>
}

export default Notification
