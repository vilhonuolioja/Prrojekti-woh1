import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">🌎 GlobeTrotter</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Maapallo</Link>
          <Link className="nav-link" to="/bucketlist">Matkahaaveet</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;