import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmitAnecdoteForm = (ev) => {
    ev.preventDefault()
    const text = ev.target.content?.value
    if (text && text.trim()) {
      dispatch(createAnecdote(text))
      ev.target.content.value = ''
    }
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
