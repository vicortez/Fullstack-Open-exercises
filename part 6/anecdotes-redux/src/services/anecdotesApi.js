const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await res.json()
}

const create = async (text) => {
  const body = JSON.stringify({
    content: text,
    votes: 0,
  })
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  }
  const res = await fetch(baseUrl, options)
  if (!res.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await res.json()
}

const update = async (anecdote) => {
  const body = JSON.stringify({
    content: anecdote.content,
    votes: anecdote.votes,
  })
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body,
  }
  const res = await fetch(`${baseUrl}/${anecdote.id}`, options)
  return await res.json()
}

export default { getAll, create, update }
