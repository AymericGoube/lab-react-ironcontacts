// src/App.js
import "./App.css";
import React, { useState } from "react";
import myContact from "./contacts.json";

function App() {
  const fiveContacts = myContact.slice(0, 5);
  const [stateApp, setStateApp] = useState(fiveContacts);
  // console.log(myContact.length);
  function addRandom() {
    let random = 0;
    do {
      random = parseInt(Math.random() * myContact.length);
    } while (stateApp.includes(myContact[random]));

    setStateApp([...stateApp, myContact[random]]);
  }
  function sortByName() {
    setStateApp([...stateApp].sort((a, b) => a.name.localeCompare(b.name)));
  }
  function sortByPopularity() {
    setStateApp([...stateApp].sort((a, b) => a.popularity - b.popularity));
  }
  function deleteContact(id) {
    let findIndex = stateApp.find((x) => {
      return x.id === id.target.id;
    });
    const copy = [...stateApp];
    copy.splice(stateApp.indexOf(findIndex), 1);
    setStateApp(copy);
  }
  return (
    <div className="App">
      <button onClick={addRandom}>Add random contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar Won</th>
            <th>Emmy won</th>
          </tr>
        </thead>
        <tbody>
          {stateApp.map((contact) => {
            if (contact.wonOscar) {
              contact.wonOscar = "🏆";
            }
            if (contact.wonEmmy) {
              contact.wonEmmy = "🏆";
            }
            return (
              <tr key={contact.id}>
                <td className="contact-picture">
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td className="contact-name">{contact.name}</td>
                <td className="contact-popularity">
                  {contact.popularity.toFixed(2)}
                </td>
                <td>{contact.wonOscar}</td>
                <td>{contact.wonEmmy}</td>
                <button id={contact.id} onClick={deleteContact}>
                  Delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
