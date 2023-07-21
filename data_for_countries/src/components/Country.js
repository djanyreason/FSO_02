import CountryInfo from "./CountryInfo";
import { useState } from "react";
import restCountryService from '../services/restcountries';

const Country = ({ name }) => {
  const [buttonText, setButtonText] = useState("show");
  const [detailBlock, setDetailBlock] = useState(<div></div>);

  const handleClick = () => {
    if(buttonText === "show") {
      setButtonText("hide");
      restCountryService
        .getOne(name)
        .then(response => setDetailBlock(<CountryInfo country={response}/>));
    } else {
      setButtonText("show");
      setDetailBlock(<div></div>);
    }
  };

  return (
    <div>
      {name}
      <button onClick={handleClick}>{buttonText}</button>
      {detailBlock}
    </div>
  )
};

export default Country;