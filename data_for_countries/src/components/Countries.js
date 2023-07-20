import CountryInfo from "./CountryInfo";

const Countries = ( { countries } ) => {
  if(countries.length === 0) {
    return (
      <div></div>
    );
  } else if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    );
  } else if (countries.length > 1) {
    return (
      countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
    );
  } else {
    return (
      <CountryInfo country={countries[0]} />
    );
  }
};

export default Countries;