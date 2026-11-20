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

function deleteToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== id)
      );
    })
    .catch((error) => console.error("Error deleting toy:", error));
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
     <ToyContainer toys={toys} onDeleteToy={deleteToy} />
    </>
  );
}

export default App;
