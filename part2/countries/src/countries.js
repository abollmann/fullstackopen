import React, {useState} from 'react'
import Weather from "./weather";

const Language = ({language}) => {
    return (
        <li>{language}</li>
    )
};

const CountryDetails = ({country}) => {
    const {capital, region, population, languages, flag} = country
    return (
        <div>
            <p><b>capital:</b> {capital}</p>
            <p><b>region:</b> {region}</p>
            <p><b>population:</b> {population}</p>
            <h4><b>languages:</b></h4>
            <ul>
                {languages.map(l => <Language key={l.name} language={l.name}/>)}
            </ul>
            <img src={flag} width="100px" height="50px" alt=""/>
            <Weather capital={capital}/>
        </div>
    )
};

const Country = ({country, unique}) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h3>{country.name}</h3>
            {unique ?
                <CountryDetails country={country}/> :
                <button onClick={() => setShowDetails(!showDetails)}>show</button>
            }
            {showDetails &&
            <CountryDetails country={country}/>
            }
        </div>
    )
};


const Countries = ({countries}) => {
    const displayCountry = (country) => {
        if (countries.length === 0) {
            return <p>no countries found, check your search</p>
        } else {
            return <Country key={country.name} country={country} unique={countries.length === 1}/>
        }
    };

    return (
        <div>
            {countries.length > 10 ?
                <p>too many countries, specify another filter</p> :
                countries.map(displayCountry)}
        </div>
    )
};


export default Countries;