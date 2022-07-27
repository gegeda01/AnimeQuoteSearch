import React from 'react';
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [recipesName, setRecipesName] = useState("");

  const Recipes_BASE_URL = "https://animechan.vercel.app/api/quotes/anime?title=";
  return (
    <div>
      <h1>Recipes Search</h1>

      <div>
        <label>Recipes Name</label>
        <br />
        <input
          type="text"
          id="recipes-name"
          name="recipes-name"
          onChange={(e) => setRecipesName(e.target.value)}
        />
        <br />
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {recipesName}</p>

      <div id="recipes-result">This will show the result</div>
    </div>
  );

  function search() {
    axios.get(Recipes_BASE_URL +  recipesName).then((res) => {
      console.log(res.data);
    });
  }
}

export default App;