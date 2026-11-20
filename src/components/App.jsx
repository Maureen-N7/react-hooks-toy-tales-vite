import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
const [toys, setToys] = useState([]);

function addToy(newToy) {
  setToys((currentToys) => [...currentToys, newToy]);
}
useEffect(() => {
  fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((data) => setToys(data));
}, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
     {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
