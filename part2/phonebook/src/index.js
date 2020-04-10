import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom"
import PhoneBook from "./phoneBook"
import Filter from "./filter"
import PersonForm from "./personForm"
import axios from "axios"
import phoneBookService from "./phoneBookService"
import Message from "./messages";

const App = () => {
        const [persons, setPersons] = useState([])
        const [newName, setNewName] = useState('')
        const [newNumber, setNewNumber] = useState('')
        const [search, setSearch] = useState('')
        const [successMsg, setSuccessMsg] = useState(null)
        const [failMsg, setFailMsg] = useState(null)

        useEffect(() => {
            axios
                .get('http://localhost:3001/persons')
                .then(response => setPersons(response.data))
        }, [])

        const handleSubmit = event => {
            event.preventDefault()
            const newEntry = {name: newName, number: newNumber}
            const oldEntry = persons.find(p => p.name === newName)
            if (oldEntry) {
                if (newNumber === oldEntry.number)
                    return
                if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`))
                    phoneBookService
                        .update(oldEntry.id, newEntry)
                        .then(() => {
                            setPersons(persons.map(p => {
                                if (p === oldEntry)
                                    p.number = newNumber
                                return p
                            }))
                            setSuccessMsg(`${newName} was updated successfully`)
                            setTimeout(() => setSuccessMsg(null), 5000)
                        })
                        .catch(console.log)
            } else {
                phoneBookService
                    .create(newEntry)
                    .then(response => {
                        setPersons([...persons, response])
                        setSuccessMsg(`${newName} was created successfully`)
                        setTimeout(() => setSuccessMsg(null), 5000)
                    })
                    .catch(() => alert(`${newName} could not be created!`))
            }
        };

        const handleDelete = (id, name) => {
            if (window.confirm(`Delete ${name}?`))
                phoneBookService
                    .deleteEntry(id)
                    .then(() => {
                        setPersons(persons.filter(p => p.id !== id))
                        setSuccessMsg(`${name} was deleted successfully`)
                        setTimeout(() => setSuccessMsg(null), 5000)
                    })
                    .catch(err => {
                        console.log(err)
                        setFailMsg(`${name} does not exist on the server!`)
                        setTimeout(() => setFailMsg(null), 5000)
                    })
        }


        return (
            <div>
                <h2>Phonebook</h2>
                <Message message={successMsg} className="success"/>
                <Message message={failMsg} className="failure"/>
                <Filter handleOnChange={event => setSearch(event.target.value)}/>
                <h3>add a new</h3>
                <PersonForm handleNameChange={event => setNewName(event.target.value)}
                            handleNumberChange={event => setNewNumber(event.target.value)}
                            handleSubmit={handleSubmit}/>
                <h2>Numbers</h2>
                <PhoneBook persons={persons} search={search} handleDelete={handleDelete}/>
            </div>
        )
    }
;

ReactDOM.render(<App/>,
    document.getElementById('root')
);

export default App