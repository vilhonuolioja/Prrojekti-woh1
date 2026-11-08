import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import BucketList from './pages/BucketList';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Reitin url vaihdettu /pokemon/ */}
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
        <Route path="/bucketlist" element={<BucketList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;