const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return <div>Missing data</div>
  }
  return (
    <div>
      <h1>
        {anecdote.content}, by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      {anecdote.info && (
        <p>
          For more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      )}
    </div>
  )
}

export default Anecdote
