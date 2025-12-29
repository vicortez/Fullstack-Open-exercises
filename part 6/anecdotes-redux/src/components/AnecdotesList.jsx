import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/messageReducer'

const AnecdotesList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteOnAnecdote(id))
    const anec = anecdotes.find((anec) => anec.id === id)
    dispatch(addNotification(`You voted '${anec.content}'`))
  }

  // This is easier to remember. Newer alternative (es2023): .toSorted(fn).
  const orderedAnecdotes = useMemo(
    () =>
      [...anecdotes]
        .sort((a, z) => a.votes - z.votes)
        .filter((el) => {
          if (filter) {
            return el.content.includes(filter)
          }
          return true
        }),
    [anecdotes, filter]
  )

  return (
    <>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdotesList
