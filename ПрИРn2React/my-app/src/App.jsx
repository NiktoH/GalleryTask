import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';

function App() {
  const [paintings, setPaintings] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const limit = 6;
  const totalPages = 4;
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allPaintings, setAllPaintings] = useState([]);

  const [artistId, setArtistId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme'); 
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch('https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest/paintings');
        const data = await response.json();
        
        const paintingsArray = data?.paths?.['/paintings']?.get?.responses?.[200]?.content?.['application/json']?.example;
        
        if (paintingsArray && Array.isArray(paintingsArray)) {
          setAllPaintings(paintingsArray);
          const paintingsWithIds = paintingsArray.map((painting, index) => ({
            ...painting,
            id: painting.id || index,
            artistId: painting.artist,
            locationId: painting.location
          }));
        } else {
          console.error('Не удалось найти массив картин в ответе', data);
          setAllPaintings([]);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setAllPaintings([]);
      }
    };

    fetchPaintings();
  }, []);

  useEffect(() => {
    let filtered = [...allPaintings];

    if (searchQuery) {
      filtered = filtered.filter(painting => 
        painting.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        painting.artist?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (artistId) {
      filtered = filtered.filter(painting => painting.artist === artistId);
    }

    if (locationId) {
      filtered = filtered.filter(painting => painting.location === locationId);
    }

    if (dateFrom) {
      filtered = filtered.filter(painting => painting.year >= parseInt(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(painting => painting.year <= parseInt(dateTo));
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    setPaintings(filtered.slice(start, end));
    
  }, [allPaintings, searchQuery, artistId, locationId, dateFrom, dateTo, page]);

  return (
    <div className={`app-wrapper ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <Header toggleTheme={toggleTheme} isDark={isDark}/>
      <Search handleSearch={handleSearch} isOpen={() => setIsFilterOpen(true)}/>

      <Filter 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        filters={{ artistId, locationId, dateFrom, dateTo }}
        setArtistId={setArtistId}
        setLocationId={setLocationId}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />

      <div className="container">
        {paintings.length > 0 ? (
          paintings.map(item => (
            <Card key={item.id || item.title} painting={item} />
          ))
        ) : (
          <div className="no-results">
            <p className='mtitle'>No matches for {searchQuery}</p>
            <p className='msubtitle'>Please try again with a different spelling or keywords.</p>
          </div>
        )}
      </div>

      <Pagination 
        page={page} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages}
      />
    </div>
    
  );
}

export default App;