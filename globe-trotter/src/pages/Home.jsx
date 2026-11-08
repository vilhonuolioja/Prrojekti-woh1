import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        // Uusi API-haku (151 ensimmäistä Pokémonia)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        
        if (!response.ok) {
          throw new Error('Datan haku epäonnistui.');
        }

        const data = await response.json();
        
        // PokéAPI palauttaa listan data.results -taulukossa
        setPokemons(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Pokédex</h1>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Ladataan...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Virhe:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;