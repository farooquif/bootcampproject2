import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 
export default function Planet() {
  const { planetId } = useParams(); // Extract planetId from URL parameters
  const [planet, setPlanet] = useState(null);
 
  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/planets/${planetId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch planet');
        }
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planet:', error);
      }
    };
 
    fetchPlanet();
  }, [planetId]); // Dependency array includes planetId to refetch when it changes
 
  if (!planet) return <p>Loading planet...</p>;
 
  return (
<div className="planet">
<h2>Planet Details</h2>
<p><strong>Name:</strong> {planet.name}</p>
<p><strong>Climate:</strong> {planet.climate}</p>
<p><strong>Terrain:</strong> {planet.terrain}</p>
<p><strong>Population:</strong> {planet.population}</p>
</div>
  );
}