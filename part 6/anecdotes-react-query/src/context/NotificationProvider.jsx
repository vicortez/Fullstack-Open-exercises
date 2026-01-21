import { useRef, useState } from 'react'
import { NotificationContext } from './NotificationContext'

// Note: This is a good case for a single provier component that provides multiple contexts. This
// is because most components will only care about the addNotification fn. So we could improve
// devX by exporting a hook that doesnt have access to the value and just exports the function
const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const notificationTimeoutIdRef = useRef(null)

  const addNotification = (text, duration = 5000) => {
    if (notificationTimeoutIdRef.current) {
      clearTimeout(notificationTimeoutIdRef.current)
    }

    setMessage(text)
    setTimeout(() => {
      setMessage('')
    }, duration)
  }

  const value = {
    message,
    addNotification,
  }
  return <NotificationContext value={value}>{children}</NotificationContext>
}

export default NotificationProvider
