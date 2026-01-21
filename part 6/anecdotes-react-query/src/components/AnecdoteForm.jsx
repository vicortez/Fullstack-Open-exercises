import { useMutation, useQueryClient } from '@tanstack/react-query'
import { use } from 'react'
import { NotificationContext } from '../context/NotificationContext'
import anecdotesApi from '../services/anecdotesApi'

const AnecdoteForm = () => {
  const { addNotification } = use(NotificationContext)

  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation({
    mutationFn: (text) => anecdotesApi.create(text),
    onSuccess: (anecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.concat(anecdote)
      })
    },
  })

  const handleSubmitAnecdoteForm = (ev) => {
    ev.preventDefault()
    const text = ev.target.content?.value
    if (!text || !text.trim() || text.length < 5) {
      // obs: the exercise text suggests there is a validation in the backend? but we are using
      // json-server. There is no validation. So we can't use the onError callback. Otherwise we
      // would place the trigger there.
      addNotification('Too short anecdote. Must have length 5 or more')
      return
    }
    anecdoteMutation.mutate(text)
    ev.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitAnecdoteForm}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
