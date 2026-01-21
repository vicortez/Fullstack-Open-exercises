import { createContext } from 'react'

/**
 * @typedef {Object} NotificationContextType
 * @property {string} message - The current notification message
 * @property {(msg: string) => void} addNotification - Function to add a new notification
 */

/** @type {import('react').Context<NotificationContextType>} */
export const NotificationContext = createContext()
