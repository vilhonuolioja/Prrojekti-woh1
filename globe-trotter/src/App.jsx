import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import BucketList from './pages/BucketList';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation näkyy aina jokaisella sivulla */}
      <Navigation />
      
      {/* Routes vaihtaa näytettävää sivua URL:n perusteella */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<CountryDetails />} />
        <Route path="/bucketlist" element={<BucketList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;