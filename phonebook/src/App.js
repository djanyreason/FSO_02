import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([  ]); 
  const [newName, setNewName] = useState('');

  //generic text entry field update function - takes the update state function
  //as a parameter and returns an event handler function
  const handleFieldEntry = (updateField) => 
    (event) => {updateField(event.target.value);};

  //Function that adds an entry to phonebook 
  //while maintaining alphabetical sort of names
  const addPerson = (sortedPeople) => {

    if(sortedPeople.length === 0) return [ { name: newName } ];

    const mid = Math.ceil(sortedPeople.length / 2);

    if(sortedPeople[mid-1].name.toLowerCase() < newName.toLowerCase()) {
      return sortedPeople.slice(0,mid).concat(addPerson(sortedPeople.slice(mid)));
    } else {
      return addPerson(sortedPeople.slice(0,mid-1)).concat(sortedPeople.slice(mid-1));
    }
  };

  const validateNameEntry = (begin, end) => {
    if(begin === end) return false;

    const mid = Math.floor((begin + end) / 2);

    if(persons[mid].name.toLowerCase() === newName.toLowerCase()) return true;
    else if (persons[mid].name.toLowerCase() < newName.toLowerCase()) {
      return validateNameEntry(mid+1, end);
    } else { return validateNameEntry(begin, mid); }
  };

  const handleAddClick = (event) => {
    event.preventDefault();

    //I believe Full Stack Open wants us to use reduce, but I wrote a different
    //function that leverages the alphabetical sort of person names to do the
    //comparison in O(log(n)) instead of O(n); I left in code using reduce,
    //commented out
    
    /*if(persons.reduce((check, person) => 
                      (check || (person.name.toLowerCase() 
                                 === newName.toLowerCase())), false)) */
    if(validateNameEntry(0, persons.length))
    {
      alert(`${newName} is already added to phonebook`);
    } else {
      //setPersons(persons.concat({ name: newName }));
      setPersons(addPerson(persons));
      setNewName('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddClick}>
        <div>
          name: <input value={newName} onChange={handleFieldEntry(setNewName)}/>
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