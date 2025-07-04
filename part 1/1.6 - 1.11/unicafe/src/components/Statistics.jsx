import { StatisticLine } from './StatisticLine'

export const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (!good && !neutral && !bad) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine
          text={'average'}
          value={all ? (good - bad) / all : '-'}
        />
        <StatisticLine
          text={'positive'}
          value={`${all ? (good / all) * 100 : '-'}%`}
        />
      </tbody>
    </table>
  )
}
