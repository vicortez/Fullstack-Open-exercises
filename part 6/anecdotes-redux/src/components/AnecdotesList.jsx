import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteOnAnecdote(id))
  }

  // This is easier to remember. Newer alternative (es2023): .toSorted(fn).
  const orderedAnecdotes = useMemo(
    () => [...anecdotes].sort((a, z) => a.votes - z.votes),
    [anecdotes]
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
