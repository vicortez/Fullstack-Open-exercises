function CountryListing({ countries, onClickShow }) {
  if (countries == null) return null
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => onClickShow(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryListing
