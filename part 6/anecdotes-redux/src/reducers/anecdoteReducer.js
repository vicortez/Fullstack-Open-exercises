import { createSlice } from '@reduxjs/toolkit'
import anecdotesApi from '../services/anecdotesApi'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    votedOnAnecdote(state, action) {
      const noteId = action.payload
      const note = state.find((el) => el.id === noteId)
      note.votes += 1
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

// -- custom action creators
const { appendAnecdote, setAnecdotes, votedOnAnecdote } = anecdoteSlice.actions

export const createAnecdote = (anecdote) => async (dispatch) => {
  const data = await anecdotesApi.create(anecdote)
  dispatch(appendAnecdote(data))
}

export const initializeAnecdotes = () => (dispatch) => {
  anecdotesApi.getAll().then((data) => dispatch(setAnecdotes(data)))
}

export const voteOnAnecdote = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find((el) => el.id === id)
  if (!anecdote) {
    return
  }

  await anecdotesApi.update({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch(votedOnAnecdote(id))
}

export default anecdoteSlice.reducer

// --- old: using raw redux
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]
// const initialState = anecdotesAtStart.map(asObject)
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
