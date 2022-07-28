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
        <h1 style={{textAlign:"center"}}><span>Anime  Quote  Search</span></h1>
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
      <br/>
      <div style={{display: "flex", justifyContent: "center" }}>
      <TextField
          id="search-bar"
          className="text"
          value={animeName}
          onChange={(prop: any) => {
            setAnimeName(prop.target.value);
          }}
          label="Enter here:"
          variant="outlined"
          placeholder="Search..."
          sx={{

            width: 800
        }}
        />
        <IconButton 
          id ="searchicon"
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "black",width:"70px"}} />
        </IconButton>
      </div>
      </div>
      <br/>
      <p style={{textAlign:"center"}} className="hint"><span>Hint:</span> Not sure which anime? Check <a href='https://animechan.vercel.app/api/available/anime'>this</a> out.</p>
      <br/>
      <p style={{textAlign:"center"}}>You have entered {animeName}</p>
      <br/>
       {animeInfo === undefined || animeInfo===null ? (
        <p className="nofound" style={{textAlign:"center"}}>{selectedtype} not found</p>
      ) : (
        <div id="anime-result" className="anime-result" style={{textAlign:"center"}}>
           <p>
            Anime: {animeInfo.anime}.
            <br />
            <br />
            Character: {animeInfo.character}.
            <br />
            <br />
            Quote: {animeInfo.quote}.
          </p>
        </div>
      )}
    </div>
  );

  function search() {
    if(selectedtype==="character"){
      Anime_BASE= "https://animechan.vercel.app/api/quotes/character?name=";
    }else if(selectedtype==="anime"){
      Anime_BASE= "https://animechan.vercel.app/api/quotes/anime?title=";
    }
    axios.get(Anime_BASE +  animeName?.toLowerCase()).then((res) => 
      {
        console.log(res.data);
        setAnimeInfo(res.data[Math.floor(Math.random() * (res.data.length))]);//Get a random quote from the list of data
      })
      .catch((err) => {
        console.log("Anime not found");
        setAnimeInfo(null);
      });
  }
}

export default App;