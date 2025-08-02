import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CountryInfo from './components/CountryInfo'
import CountryListing from './components/CountryListing'

function App() {
  const [countryNameText, setCountryNameText] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [countrySelectedToShow, setCountrySelectedToShow] = useState(null)

  const filteredCountries = useMemo(() => {
    if (!debouncedQuery) {
      return []
    }
    return countries
      .filter(countryNameContainsFilter(debouncedQuery))
      .toSorted((a, b) => a.name.common.localeCompare(b.name.common))
  }, [countries, debouncedQuery])

  useEffect(() => {
    setCountrySelectedToShow(null)
  }, [countries, debouncedQuery])

  // initially fetch countries
  useEffect(() => {
    fetchCountries().then(setCountries)
  }, [])

  // set query on a timeout for debouncing
  useEffect(() => {
    const timeoutRef = setTimeout(() => setDebouncedQuery(countryNameText), 500)
    return () => clearTimeout(timeoutRef)
  }, [countryNameText])

  const handleClickShow = (country) => setCountrySelectedToShow(country)

  const infoText = getInfoText(filteredCountries, debouncedQuery)
  const countryToShow = countrySelectedToShow
    ? countrySelectedToShow
    : filteredCountries.length === 1 && filteredCountries[0]
  return (
    <>
      <label>
        Find countries{' '}
        <input
          type="text"
          value={countryNameText}
          onChange={(ev) => setCountryNameText(ev.target.value)}
        />
      </label>
      {infoText && <p>{infoText}</p>}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <CountryListing
          countries={filteredCountries}
          onClickShow={handleClickShow}
        />
      )}
      {countryToShow && <CountryInfo country={countryToShow} />}
    </>
  )
}

export default App

const getInfoText = (countries, currentFilterText) => {
  let infoText = ''
  if (currentFilterText) {
    if (!Array.isArray(countries) || countries.length < 1) {
      infoText = 'No countries found'
    } else if (countries.length > 10) {
      infoText = 'Too many matches, specify another filter'
    }
  }
  return infoText
}
function countryNameContainsFilter(countryNameText) {
  return (country) =>
    country.name.common
      .toLowerCase()
      .trim()
      .includes(countryNameText.toLowerCase().trim())
}

// returns data as promise
const fetchCountries = () => {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  return axios.get(url).then((res) => res.data)
}
