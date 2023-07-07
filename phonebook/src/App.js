import { useState } from 'react';
import Entry from './components/Entry';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([  ]); 

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
        {persons.map(person => <Entry key={person.name} person={person} />)}
    </div>
  );
};

export default App;