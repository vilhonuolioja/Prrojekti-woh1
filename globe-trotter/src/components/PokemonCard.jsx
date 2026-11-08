import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  // Haetaan Pokémonin ID URL-osoitteesta (esim. "https://pokeapi.co/api/v2/pokemon/1/")
  const id = pokemon.url.split('/')[6];
  // Käytetään ID:tä virallisen artwork-kuvan hakemiseen
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="col-12 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm text-center">
        <img 
          src={imageUrl} 
          className="card-img-top p-3" 
          alt={`Kuva: ${pokemon.name}`} 
          style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
        />
        <div className="card-body d-flex flex-column">
          {/* text-capitalize muuttaa nimen ekan kirjaimen isoksi */}
          <h5 className="card-title text-capitalize">{pokemon.name}</h5>
          
          <Link 
            to={`/pokemon/${pokemon.name}`} 
            className="btn btn-outline-danger mt-auto"
          >
            Näytä tiedot
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;