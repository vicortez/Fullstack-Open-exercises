import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesApi from '../services/anecdotesApi'

const AnecdoteForm = () => {
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
    if (!text && text.trim()) {
      return
    }
    if (text.length < 5) {
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
