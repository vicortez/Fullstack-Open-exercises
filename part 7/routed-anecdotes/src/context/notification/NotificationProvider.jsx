import { useMemo, useRef, useState } from 'react'
import { NotificationContext, NotificationValueContext } from './NotificationContext'

const NotificationProvider = ({ children }) => {
  const [msg, setMsg] = useState('')
  const timeoutIdRef = useRef()

  const notify = (msg, { timeoutMs = 5000 } = {}) => {
    if (timeoutIdRef.current != null) {
      clearTimeout(timeoutIdRef)
    }
    setMsg(msg)
    timeoutIdRef.current = setTimeout(() => {
      setMsg('')
    }, timeoutMs)
  }

  const notificationValue = useMemo(
    () => ({
      notify,
    }),
    [],
  )
  const notificationValueValue = useMemo(() => msg, [msg])

  return (
    <NotificationContext.Provider value={notificationValue}>
      <NotificationValueContext.Provider value={notificationValueValue}>
        {children}
      </NotificationValueContext.Provider>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
