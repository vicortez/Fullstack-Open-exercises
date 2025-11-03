// NotificationContext.jsx
// declares a context for the notification message and message color (danger, success, etc.)
// and provides a hook to access the values, and another hook to update the values

import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('NotificationContext must be used within a provider')
  }
  return context[0]
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('NotificationContext must be used within a provider')
  }
  return context[1]
}

const message_display_time = 5000

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: 'success' })
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const updateNotification = ({ message, type = 'success' }) => {
    setNotification({ message, type })
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, message_display_time)
  }

  return (
    <NotificationContext.Provider value={[notification, updateNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}
