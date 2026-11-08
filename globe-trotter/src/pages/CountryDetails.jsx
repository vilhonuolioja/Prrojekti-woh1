import { useParams } from 'react-router-dom';

function CountryDetails() {
  // useParams hakee URL:sta valitun maan nimen (myöhemmin)
  const { countryName } = useParams();

  return (
    <div className="container">
      <h2>Tiedot maasta: {countryName}</h2>
      <p>Tänne ladataan valitun maan tarkemmat tiedot ja lippu.</p>
    </div>
  );
}

export default CountryDetails;