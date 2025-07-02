import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
 
export default function Planet() {
  const { planetId } = useParams(); // Extract planetId from URL parameters
  const [planet, setPlanet] = useState(null);
  const [characters, setCharacters] = useState(null);
 
  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const [response, response2] = await Promise.all([
            fetch(`http://localhost:3000/api/planets/${planetId}`),
            fetch(`http://localhost:3000/api/planets/${planetId}/characters`),
        ]);
        const [dataPlanet, dataCharacters] = await Promise.all([
            response.json(),
            response2.json()
        ]);
        setPlanet(dataPlanet)
        setCharacters(dataCharacters)
        // const response = await fetch(`http://localhost:3000/api/planets/${planetId}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch planet');
        // }
        // const data = await response.json();
        // setPlanet(data);

        // const response2 = await fetch (`http://localhost:3000/api/planets/${planetId}/characters`)
        // if (!response.ok) {
        //     throw new Error('Failed to fetch planet');
        //   }
        // const data2 = await response.json();
        // setCharacters(data2)
        // console.log(characters)
      } catch (error) {
        console.error('Error fetching planet:', error);
      }
    };
 
    fetchPlanet();
  }, [planetId]);
 
  if (!planet) return <p>Loading planet...</p>;
 
  return (
    <div className="planet">
    <h2>Planet Details</h2>
    <p><strong>Name:</strong> {planet.name}</p>
    <p><strong>Climate:</strong> {planet.climate}</p>
    <p><strong>Terrain:</strong> {planet.terrain}</p>
    <p><strong>Population:</strong> {planet.population}</p>

    <h3>Characters</h3>
        <div id="charactersList"> {/* Changed className to id for consistency */}
        {characters.map(character => (
            <div id="character-box" key={character.id}> {/* Changed className to id for consistency */}
            <span><Link to={`/characters/${character.id}`}>{character.name}</Link></span>
            </div>
        ))}
        </div>
    </div>
  );
}