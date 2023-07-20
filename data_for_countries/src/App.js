import { useState, useEffect } from "react";
import restCountryService from './services/restcountries';

function App() {
  restCountryService
    .getAll()
    .then(response => console.log(response));
  
  restCountryService
    .getOne("finland")
    .then(response => console.log(response));

  return (
    <div>
    </div>
  );
}

export default App;
