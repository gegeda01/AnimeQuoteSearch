import React from 'react';
import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [selectedtype, setSelectedType] = useState<String>();
  const [animeName, setAnimeName] = useState("");
  const [animeInfo,setAnimeInfo] = useState<undefined | any>(undefined);
  const isRadioSelected = (value:string):boolean => selectedtype===value;
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };
  //const Anime_BASE_URL_NAME = "https://animechan.vercel.app/api/quotes/anime?title=";
  //const Anime_BASE_URL_CHARACT = "https://animechan.vercel.app/api/quotes/character?name=";
  var Anime_BASE = "https://animechan.vercel.app/api/random";
  return (
    <div>
      <div className="search-field">
        <h1 style={{textAlign:"center"}}>Anime Quote Search</h1>
        <div style={{display: "flex", justifyContent: "center" }}>
        <p>
          <input
            type="radio"
            name="anime"
            value="anime"
            id="anime"
            checked={isRadioSelected('anime')}
            onChange={radioHandler}
          />
          <label htmlFor="anime">Search by Anime Name</label>
        </p>

        <p>
          <input
            type="radio"
            name="character"
            value="character"
            id="character"
            checked={isRadioSelected('character')}
            onChange={radioHandler}
          />
          <label htmlFor="character">Search by Character Name</label>
        </p>
      </div>
      <div style={{display: "flex", justifyContent: "center" }}>
      <TextField
          id="search-bar"
          className="text"
          value={animeName}
          onChange={(prop: any) => {
            setAnimeName(prop.target.value);
          }}
          label="Enter blow:"
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
      <p style={{textAlign:"center"}}>You have entered {animeName}</p>

       {animeInfo === undefined ? (
        <p style={{textAlign:"center"}}>Anime not found</p>
      ) : (
        <div id="anime-result" style={{textAlign:"center"}}>
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
    if(selectedtype==="character"){
      Anime_BASE= "https://animechan.vercel.app/api/quotes/character?name=";
    }else{
      Anime_BASE= "https://animechan.vercel.app/api/quotes/anime?title=";
    }
    axios.get(Anime_BASE +  animeName).then((res) => 
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