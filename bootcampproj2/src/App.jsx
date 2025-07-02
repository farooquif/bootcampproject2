import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Characters from "./components/Characters"
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/characters/')
        const res = await response.json()
        setCharacters(res)
        // console.log(res)
      } catch (error) {
        console.error('Error fetching characters: ', error)
      }
    };
    loadCharacters();
  }, []);

  return (
    <>
    <Router>
      <div>
        {/* Title */}
        <h1 id="starting-page-title">Star Wars Universe Lookup</h1>
        
        {/* New Tagline */}
        <p id="starting-page-description">Explore the Galaxy, One Character at a Time!</p>
        
        <input id="searchString" autoComplete="off" placeholder="Luke Skywalker..."/>
        {/* onInput="filterCharacters()" */}
      </div>
      <Routes>
          <Route path="/" element={
            <section id="charactersList">
              {
                characters.map((character) => (
                  <div id="character-box" key={character.id}>
                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                  </div>
                ))}
            </section>
          } />
      </Routes>
      </Router>
    </>
  )
}

export default App
