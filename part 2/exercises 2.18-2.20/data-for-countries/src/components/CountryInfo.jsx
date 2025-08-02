import axios from 'axios'
import { useEffect, useState } from 'react'

function CountryInfo({ country }) {
  const [temperature, setTemperature] = useState(null)
  // load weather data
  useEffect(() => {
    fetchWeather(country.capital[0])
      .then((weather) => setTemperature(weather.main.temp))
      .catch(() => setTemperature(null))
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {!temperature && <p>No weather data found...</p>}
      {temperature && (
        <div>
          <h1>Weather in {country.capital[0]}</h1>
          <p>Temperature {temperature} K</p>
        </div>
      )}
    </div>
  )
}

export default CountryInfo

// returns promise of data
const fetchWeather = (cityName) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const params = {
    q: cityName,
    appId: import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY,
  }
  return axios.get(url, { params }).then((res) => res.data)
}
