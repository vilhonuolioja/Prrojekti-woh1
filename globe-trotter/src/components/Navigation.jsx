import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">🔴 PokéTeam Builder</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Pokédex</Link>
          <Link className="nav-link" to="/bucketlist">Oma Tiimi</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;