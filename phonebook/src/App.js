import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const handleNameEntry = (event) => {setNewName(event.target.value);}

  const handleAddClick = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddClick}>
        <div>
          name: <input value={newName} onChange={handleNameEntry}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  );
};

export default App;