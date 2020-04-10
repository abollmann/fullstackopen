import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
    const randomAnecdote = () => Math.round(Math.random() * (anecdotes.length - 1))
    const [selected, setSelected] = useState(randomAnecdote())
    const [mostVotes, setMostVotes] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const vote = () => {
        setVotes(votes.map((v, i) => i === selected ? ++v : v ))
        setMostVotes(votes.findIndex(v => v === Math.max(...votes)))
    }

    return (
        <div>
            <div>
                <h2>Anecdote of the day</h2>
                "{anecdotes[selected]}"
            </div>
            <p>has {votes[selected]} votes</p>
            <div>
                <button onClick={() => vote()}>vote</button>
                <button onClick={() => setSelected(randomAnecdote())}>next anecdote</button>
                <div>
                    <h2>Anecdote with most votes</h2>
                    "{anecdotes[mostVotes]}"
                </div>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)