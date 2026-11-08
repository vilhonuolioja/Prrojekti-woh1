import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Rekisteröidään Chart.js:n komponentit
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BucketList() {
  const [team, setTeam] = useState([]);

  // Ladataan tiimi LocalStoragesta sivun latautuessa
  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    setTeam(savedTeam);
  }, []);

  // Poista Pokémon tiimistä
  const removeFromTeam = (id) => {
    const updatedTeam = team.filter(p => p.id !== id);
    setTeam(updatedTeam);
    localStorage.setItem('pokemonTeam', JSON.stringify(updatedTeam));
  };

  // Datan valmistelu Chart.js -pylväsdiagrammia varten
  const chartData = {
    labels: team.map(p => p.name.toUpperCase()),
    datasets: [
      {
        label: 'HP (Elämäpisteet)',
        data: team.map(p => p.stats[0].base_stat),
        backgroundColor: 'rgba(220, 53, 69, 0.7)', // Bootstrap Danger -väri
      },
      {
        label: 'Hyökkäys (Attack)',
        data: team.map(p => p.stats[1].base_stat),
        backgroundColor: 'rgba(13, 110, 253, 0.7)', // Bootstrap Primary -väri
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tiimin jäsenten taistelutilastot',
      },
    },
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Oma Pokémon-tiimi ({team.length} / 6)</h1>

      {team.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Tiimisi on vielä tyhjä! Mene takaisin <Link to="/" className="alert-link">Pokédexiin</Link> ja lisää suosikkisi tiimiin.
        </div>
      ) : (
        <>
          {/* Tiimin kortit */}
          <div className="row g-4 mb-5">
            {team.map((pokemon) => (
              <div key={pokemon.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm text-center p-3">
                  <img 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                    style={{ height: '120px', objectFit: 'contain' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title text-capitalize">{pokemon.name}</h4>
                    <p className="text-muted">Tyypit: {pokemon.types.map(t => t.type.name).join(', ')}</p>
                    <button 
                      className="btn btn-outline-danger btn-sm mt-auto"
                      onClick={() => removeFromTeam(pokemon.id)}
                    >
                      Poista tiimistä
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Datan visualisointi Chart.js -kirjastolla */}
          <div className="card shadow p-4 bg-white">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}

export default BucketList;