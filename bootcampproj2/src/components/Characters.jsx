import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Characters() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resChar, resFilms] = await Promise.all([
          fetch(`http://localhost:3000/api/characters/${characterId}`),
          fetch(`http://localhost:3000/api/characters/${characterId}/films`)
        ]);

        if (!resChar.ok || !resFilms.ok) {
          throw new Error('One or more requests failed');
        }

        const [dataChar, dataFilms] = await Promise.all([
          resChar.json(),
          resFilms.json()
        ]);

        setCharacter(dataChar);
        setFilms(dataFilms);
      } catch (err) {
        console.error('Failed to load character data:', err);
      }
    };

    fetchData();
  }, [characterId]);

  if (!character) return <p>Loading character...</p>;

  return (
    <div className="character">
      <h2>{character.name}</h2>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
      
      <h3>Films</h3>
      {films.map(film => (
        <div key={film.id} className="film">
          <p><strong>Title:</strong> {film.title}</p>
          <p><strong>Director:</strong> {film.director}</p>
          <p><strong>Release Date:</strong> {film.release_date}</p>
        </div>
      ))}
    </div>
  );
}
