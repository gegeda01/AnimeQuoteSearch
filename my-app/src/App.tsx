import React from 'react';
import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [animeName, setAnimeName] = useState("");
  const [animeInfo,setAnimeInfo] = useState<undefined | any>(undefined);
  const Anime_BASE_URL = "https://animechan.vercel.app/api/quotes/anime?title=";


  return (
    <div>
      <div className="search-field">
        <h1  style={{ display: "inline", justifyContent: "center" }}>Anime Quote Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
      <TextField
          id="search-bar"
          className="text"
          value={animeName}
          onChange={(prop: any) => {
            setAnimeName(prop.target.value);
          }}
          label="Enter a Anime Name..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
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
        setAnimeInfo(res.data[Math.floor(Math.random() * (res.data.length))]);//Get a random quote from the list of data
      })
      .catch((err) => {
        console.log("Anime not found");
        setAnimeInfo(undefined);
      });
  }
}

export default App;