import React from 'react'


const PhoneBook = ({persons, search, handleDelete}) => {
    function displayPhoneBook({id, name, number}) {
        if (search === '' || name.toLowerCase().includes(search.toLowerCase())) {
            return <PhoneBookEntry key={id} id={id}
                                   name={name} number={number}
                                   handleDelete={handleDelete}/>
        }
    }

    return (
        <div>
            {persons.map(displayPhoneBook)}
        </div>
    )
};

const PhoneBookEntry = ({id, name, number, handleDelete}) => {
    return (
        <div>
            <p>{name} {number} <button onClick={() => handleDelete(id, name)}>delete</button></p>
        </div>
    )
};

export default PhoneBook
