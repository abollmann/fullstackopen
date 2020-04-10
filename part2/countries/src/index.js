import React, {useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Search from "./search"
import Countries from "./countries"

const App = () => {
    const [countries, setCountries] = useState([]);

    const getCountries = (event) => {
        axios
            .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
            .then(({data}) => setCountries(data))
            .catch(console.log)
    };

    return (
        <div className="App">
            <Search handleChange={getCountries}/>
            <Countries countries={countries}/>
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
