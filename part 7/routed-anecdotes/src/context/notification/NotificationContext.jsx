import { createContext, useContext } from 'react'

export const NotificationContext = createContext({})
NotificationContext.displayName = 'NotificationContext'
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context == null) {
    throw new Error('Context used outisde Provider?')
  }
  return context
}

// Usage exclusive to the notificaiton component
export const NotificationValueContext = createContext('')
NotificationValueContext.displayName = 'NotificationValueContext'

export const useNotificationValue = () => {
  const context = useContext(NotificationValueContext)
  if (context == null) {
    throw new Error('Context used outisde Provider?')
  }
  return context
}
