import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesApi from './services/anecdotesApi'

const App = () => {
  const { error, isPending } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesApi.getAll,
    retry: 1,
  })

  if (isPending) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>anecdote service not available due to problems in the server</div>
  }
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App
