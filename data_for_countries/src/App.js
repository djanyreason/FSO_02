import { useState, useEffect } from "react";
import restCountryService from './services/restcountries';
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);

    if(newFilter === "") setCountries([]);
    else {
      restCountryService
        .getAll()
        .then(response => {
          setCountries(response.reduce((list, item) => {
            return (item.name.common.toLowerCase().search(newFilter.toLowerCase()) < 0) ?
              list : list.concat(item);
          }, []));
        });

      if(countries.length === 1) {
        const countryName=countries[0].name.common;
        restCountryService
          .getOne(countryName)
          .then(response => setCountries([ response ]));
      } 
    }
  };

  return (
    <div>
      <Filter filterText={filter} updateFilter={updateFilter} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
