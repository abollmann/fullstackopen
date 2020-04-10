import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => {
    console.log(handleClick)
    return (
        <button onClick={handleClick}>{name}</button>
    )
}

const Statistic = ({name, number}) => {

    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + bad + neutral
    const average = (good - bad) / total
    const positivePercentage = good / total
    return (
        <div>
            <h2>statistics</h2>
            {total > 0 ?
                <table>
                    <tbody>
                    <Statistic name="good" number={good}/>
                    <Statistic name="neutral" number={neutral}/>
                    <Statistic name="bad" number={bad}/>
                    <Statistic name="average" number={average}/>
                    <Statistic name="positive" number={`${positivePercentage}%`}/>
                    </tbody>
                </table>
                :
                <text> No feedback given</text>
            }
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button name="good" handleClick={() => setGood(good + 1)}/>
            <Button name="neutral" handleClick={() => setNeutral(neutral + 1)}/>
            <Button name="bad" handleClick={() => setBad(bad + 1)}/>
            <Statistics bad={bad} good={good} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)