import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { getCountries } from './api'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  // const timeOutIdRef = useRef()

  useEffect(() => {
    // if (timeOutIdRef.current) {
    //   clearTimeout(timeOutIdRef.current)
    // }
    // timeOutIdRef.current = setTimeout(async () => {
    // }, 5000)
    const fetchCountry = async () => {
      if (name) {
        try {
          const res = await getCountries(name)
          setCountry({ data: res.data, found: true })
        } catch (error) {
          setCountry({ found: false })
        }
      }
    }
    fetchCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log('i, coutrny, received', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flags.svg} height="100" alt={`flag of ${country.data.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
