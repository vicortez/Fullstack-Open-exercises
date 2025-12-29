import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteOnAnecdote(state, action) {
      const noteId = action.payload
      const note = state.find((el) => el.id === noteId)
      note.votes += 1
    },
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
  },
})

export const { createAnecdote, voteOnAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// --- old: using raw redux
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE': {
//       const noteId = action.noteId
//       const note = state.find((el) => el.id === noteId)
//       const newNote = { ...note, votes: note.votes + 1 }
//       const newState = state.map((el) => (el.id !== noteId ? el : newNote))
//       return newState
//     }
//     case 'CREATE': {
//       const newAnecdote = asObject(action.content)

//       return [...state, newAnecdote]
//     }
//     default:
//       return state
//   }
// }

// // -- Anecdote action creators

// export const createAnecdote = (content) => ({ type: 'CREATE', content })

// export const voteOnAnecdote = (id) => ({ type: 'VOTE', noteId: id })

// export default reducer
