import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState, useEffect} from "react"
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/characters/')
        const res = await response.json()
        setCharacters(res)
        console.log(res)
      } catch (error) {
        console.error('Error fetching characters: ', error)
      }
    };
    loadCharacters();
  }, []);

  return (
    <>
      <div>
        {/* Title */}
        <h1 id="starting-page-title">Star Wars Universe Lookup</h1>
        
        {/* New Tagline */}
        <p id="starting-page-description">Explore the Galaxy, One Character at a Time!</p>
        
        <input id="searchString" autoComplete="off" placeholder="Luke Skywalker..."/>
        {/* onInput="filterCharacters()" */}
      </div>
      
      <section id="charactersList">
        {
          characters.map((character) => (
            <div id="character-box">
              <a key={character.id} data={character}>{character.name}</a>
            </div>
            
          ))
        }
      </section>
    </>
  )
}

export default App
