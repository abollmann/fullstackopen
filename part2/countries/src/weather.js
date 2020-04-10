import React, {useEffect, useState} from 'react'
import axios from 'axios'

const API_KEY = process.env.API_KEY || '8e3c1b91991ff617d95860a8e85f1960'
const URL = 'http://api.openweathermap.org/data/2.5/weather?q='

const Weather = ({capital}) => {
    const [weatherData, setWeatherData] = useState(undefined);
    useEffect(() => {
        axios
            .get(`${URL}${capital}&units=metric&appid=${API_KEY}`)
            .then(response => {
                console.log(response)
                setWeatherData(response.data)
            })
            .catch(console.log)
    }, [capital])

    return (
        <div>
            {weatherData &&
            <div>
                <h4>Weather in {capital}</h4>
                <p><b>description:</b> {weatherData.weather[0].description}</p>
                <p><b>temperature:</b> {weatherData.main.temp}</p>
                <p><b>wind:</b> {weatherData.wind.speed}</p>
            </div>
            }
        </div>
    )
};

export default Weather