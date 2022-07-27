import React from 'react';
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [animeName, setAnimeName] = useState("");
  const [animeInfo,setAnimeInfo] = useState<undefined | any>(undefined);
  const Anime_BASE_URL = "https://animechan.vercel.app/api/quotes/anime?title=";


  return (
    <div>
      <h1>Anime Search</h1>

      <div>
        <label>Anime Name</label>
        <br />
        <input
          type="text"
          id="anime-name"
          name="anime-name"
          onChange={(e) => setAnimeName(e.target.value)}
        />
        <br />
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {animeName}</p>

       {animeInfo === undefined ? (
        <p>Anime not found</p>
      ) : (
        <div id="anime-result">
           <p>
            Anime: {animeInfo.anime}
            <br />
            Character: {animeInfo.character} 
            <br />
            Quote: {animeInfo.quote}
          </p>
        </div>
      )}
    </div>
  );

  function search() {
    axios.get(Anime_BASE_URL +  animeName).then((res) => 
      {
        console.log(res.data);
        setAnimeInfo(res.data[Math.floor(Math.random() * (10 + 1))]);
      })
      .catch((err) => {
        console.log("Anime not found");
        setAnimeInfo(undefined);
      });
  }
}

export default App;