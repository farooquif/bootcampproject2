import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Characters() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await fetch(`http://localhost:3000/api/characters/${characterId}`);
        if (!resChar.ok) throw new Error('Character fetch failed');
        const dataChar = await resChar.json();
        setCharacter(dataChar);

        const [resFilms, resPlanet, resSpecies] = await Promise.all([
          fetch(`http://localhost:3000/api/characters/${characterId}/films`),
          fetch(`http://localhost:3000/api/planets/${dataChar.homeworld}`),
          fetch(`http://localhost:3000/api/species/${dataChar.species_id}`)
        ]);

        if (!resFilms.ok || !resPlanet.ok || !resSpecies.ok) {
          throw new Error('One or more related fetches failed');
        }

        const [dataFilms, dataPlanet, dataSpecies] = await Promise.all([
          resFilms.json(),
          resPlanet.json(),
          resSpecies.json()
        ]);

        setFilms(dataFilms);
        setPlanet(dataPlanet);
        setSpecies(dataSpecies);
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
      <p>
        <strong>Planet: </strong>
        {planet ? (
          <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
        ) : (
          'Unknown'
        )}
      </p>
      <p>
        <strong>Species: </strong>
        {species ? (
          <strong>{species.name}</strong>
        ) : (
          'Unknown'
        )}
      </p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>

      <h3>Films</h3>
      {films.map(film => (
        <div key={film.id} className="film">
          <p> <Link to={`/films/${film.id}`}>{film.title}</Link></p>
        </div>
      ))}
    </div>
  );
}