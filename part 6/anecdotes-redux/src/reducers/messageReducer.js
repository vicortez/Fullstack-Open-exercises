import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: 'initial',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { clearNotification, setNotification } = messageSlice.actions

// -- custom action creators

// a thunk action creator for adding a notification text
let notificationTimeoutId
export const addNotification =
  (text, duration = 5000) =>
  (dispatch) => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId)
    }
    dispatch(setNotification(text))
    notificationTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }

export default messageSlice.reducer
