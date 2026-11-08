import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
  const { pokemonName } = useParams();
  
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
          throw new Error('Pokémonin tietojen haku epäonnistui.');
        }

        const data = await response.json();
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  // Funktio Pokémonin lisäämiseksi tiimiin localStorageen
  const addToTeam = () => {
    const savedTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    
    // Tarkistetaan onko tiimi jo täynnä (max 6)
    if (savedTeam.length >= 6) {
      alert('Tiimissä on jo maksimimäärä (6) Pokémoneja!');
      return;
    }

    // Tarkistetaan onko Pokémon jo tiimissä
    if (savedTeam.some(p => p.id === pokemon.id)) {
      alert('Tämä Pokémon on jo tiimissäsi!');
      return;
    }

    const updatedTeam = [...savedTeam, pokemon];
    localStorage.setItem('pokemonTeam', JSON.stringify(updatedTeam));
    alert(`${pokemon.name.toUpperCase()} lisätty tiimiin!`);
  };

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Takaisin Pokédexiin
      </Link>

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

      {!loading && !error && pokemon && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4 text-center">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name} 
                className="img-fluid mx-auto"
                style={{ maxHeight: '250px', objectFit: 'contain' }}
              />
              <h1 className="text-capitalize mt-3">{pokemon.name}</h1>
              <p className="text-muted">ID: #{pokemon.id}</p>

              <div className="row text-start mt-3">
                <div className="col-6">
                  <p><strong>Pituus:</strong> {pokemon.height / 10} m</p>
                  <p><strong>Paino:</strong> {pokemon.weight / 10} kg</p>
                </div>
                <div className="col-6">
                  <p><strong>Tyypit:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                  <p><strong>HP (Elämäpisteet):</strong> {pokemon.stats[0].base_stat}</p>
                </div>
              </div>

              <button 
                className="btn btn-danger mt-3"
                onClick={addToTeam}
              >
                ❤️ Lisää tiimiin (LocalStorage)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;