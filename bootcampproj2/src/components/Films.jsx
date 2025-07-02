import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Films = () => {
  const { filmId } = useParams(); // Get the filmId from the URL parameters
  const [film, setFilm] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resFilm, resPlanets, resCharacters] = await Promise.all([
          fetch(`http://localhost:3000/api/films/${filmId}`),
          fetch(`http://localhost:3000/api/films/${filmId}/planets`),
          fetch(`http://localhost:3000/api/films/${filmId}/characters`)
        ]);

        if (!resFilm.ok || !resPlanets.ok || !resCharacters.ok) {
          throw new Error('One or more requests failed');
        }

        const [dataFilm, dataPlanets, dataCharacters] = await Promise.all([
          resFilm.json(),
          resPlanets.json(),
          resCharacters.json()
        ]);

        setFilm(dataFilm);
        setPlanets(dataPlanets);
        setCharacters(dataCharacters);
      } catch (err) {
        console.error('Failed to load film data:', err);
      }
    };

    fetchData();
  }, [filmId]);

  if (!film) return <p>Loading film...</p>;

  return (
    <div className="film-details">
        <h2>{film.title}</h2>
        
        <h3>Planets</h3>
        <div className="planets-list">
            {planets.map(planet => (
            <div key={planet.id} className="planet-item">
                <span><Link to={`/planets/${planet.id}`}>{planet.name}</Link></span>
            </div>
            ))}
        </div>
        
        <h3>Characters</h3>
        <div className="characters-list">
            {characters.map(character => (
            <div key={character.id} className="character-item">
                <span><Link to={`/characters/${character.id}`}>{character.name}</Link></span>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Films;
