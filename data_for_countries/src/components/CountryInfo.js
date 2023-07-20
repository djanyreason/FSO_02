const CountryInfo = ( {country} ) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]} </div>
      <div>area {country.area} </div>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  );
};

export default CountryInfo;