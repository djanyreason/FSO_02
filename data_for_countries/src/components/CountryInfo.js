import { useState, useEffect } from "react";
import weatherService from '../services/weather';

const CountryInfo = ( {country} ) => {
  const [weather, setWeather] = useState(<div></div>);

  useEffect(() => {
    weatherService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(response => {
        setWeather(<div>
          <p>temperature {response.main.temp} Celsius</p>
          <img 
            src={"https://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png"}
            alt={response.weather.main}
          ></img>
          <p>wind {response.wind.speed} m/s</p>
        </div>);
      });
  }, []);

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
      <h3>Weather in {country.capital[0]}</h3>
      {weather}
    </div>
  );
};

export default CountryInfo;