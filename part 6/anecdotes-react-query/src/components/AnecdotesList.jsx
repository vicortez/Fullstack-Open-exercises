import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNotification } from '../reducers/messageReducer'
import { default as a, default as anecdotesApi } from '../services/anecdotesApi'

const AnecdotesList = () => {
  const { data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: a.getAll,
    initialData: [],
    retry: 1,
  })
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => anecdotesApi.update(anecdote),
    onSuccess: (anecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.map((el) => (el.id === anecdote.id ? anecdote : el))
      })
    },
  })

  const filter = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anec = anecdotes.find((anec) => anec.id === id)
    updateAnecdoteMutation.mutate({ ...anec, votes: anec.votes + 1 })
    dispatch(addNotification(`You voted '${anec.content}'`, 4000))
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
