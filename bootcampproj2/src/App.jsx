import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Character from "./components/Characters.jsx";
import Planet from "./components/Planets.jsx";
import Films from "./components/Films.jsx"
import './App.css';
 
 
function App() {
  const [characters, setCharacters] = useState([]);
 
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/characters/');
        const res = await response.json();
        setCharacters(res);
      } catch (error) {
        console.error('Error fetching characters: ', error);
      }
    };
    loadCharacters();
  }, []);
 
  return (
<Router>
<div>
<h1 id="starting-page-title">Star Wars Universe Lookup</h1>
<p id="starting-page-description">Explore the Galaxy, One Character at a Time!</p>
<input id="searchString" autoComplete="off" placeholder="Luke Skywalker..." />
<nav>
<Link to="/">Characters</Link>
</nav>
</div>
<Routes>
<Route path="/" element={
<section id="charactersList">
            {characters.map((character) => (
<div id="character-box" key={character.id}>
<Link to={`/characters/${character.id}`}>{character.name}</Link>
</div>
            ))}
</section>
        } />
<Route path="/characters/:characterId" element={<Character />} />
<Route path="/planets/:planetId" element={<Planet />} />
<Route path="/films/:filmId" element={<Films />} />
</Routes>
</Router>
  );
}
 
export default App;