import { useState } from 'react'
import { Button } from './components/Button'
import { Statistics } from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood((prev) => prev + 1)} text={'good'} />
      <Button onClick={() => setNeutral((prev) => prev + 1)} text={'neutral'} />
      <Button onClick={() => setBad((prev) => prev + 1)} text={'bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
