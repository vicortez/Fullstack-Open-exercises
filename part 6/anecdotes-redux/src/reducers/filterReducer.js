import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(state, { payload }) {
      return payload
    },
  },
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer

// --- Old: using raw Redux
// // a typical redux reducer: receives state and action, returns state
// const filterReducer = (state = '', action) => {
//   console.log('[reducer] action:', action)

//   switch (action.type) {
//     case 'UPDATE_FILTER':
//       return action.text
//     default:
//       return state
//   }
// }

// // -- filter action Creators

// export const updateFilter = (text) => {
//   return {
//     type: 'UPDATE_FILTER',
//     text,
//   }
// }

// export default filterReducer
