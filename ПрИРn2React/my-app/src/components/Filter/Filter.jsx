import { useState, useEffect } from 'react';
import './Filter.css'
import closeIcon from '../../assets/close-icon.svg'

const Filter = ({ 
    isOpen, 
    onClose, 
    filters, 
    setArtistId, 
    setLocationId, 
    setDateFrom, 
    setDateTo 
}) => {
    const [artists, setArtists] = useState([]);
    const [locations, setLocations] = useState([]);
    const [openSections, setOpenSections] = useState({ artist: false, location: false, year: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest/paintings');
                const data = await response.json();
                
                const paintingsArray = data?.paths?.['/paintings']?.get?.responses?.[200]?.content?.['application/json']?.example;
                
                if (paintingsArray && Array.isArray(paintingsArray)) {
                    const uniqueArtists = [];
                    const artistMap = new Map();
                    
                    paintingsArray.forEach(painting => {
                        if (painting.artist && !artistMap.has(painting.artist)) {
                            artistMap.set(painting.artist, {
                                id: painting.artist,
                                name: painting.artist
                            });
                            uniqueArtists.push({
                                id: painting.artist,
                                name: painting.artist
                            });
                        }
                    });
                    
                    const uniqueLocations = [];
                    const locationMap = new Map();
                    
                    paintingsArray.forEach(painting => {
                        if (painting.location && !locationMap.has(painting.location)) {
                            locationMap.set(painting.location, {
                                id: painting.location,
                                location: painting.location
                            });
                            uniqueLocations.push({
                                id: painting.location,
                                location: painting.location
                            });
                        }
                    });
                    
                    setArtists(uniqueArtists);
                    setLocations(uniqueLocations);
                } else {
                    console.error('Не удалось найти массив картин');
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

    const toggle = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleClear = () => {
        setArtistId(null);
        setLocationId(null);
        setDateFrom('');
        setDateTo('');
    };

    const selectedArtistName = artists.find(a => a.id === filters.artistId)?.name || "";
    const selectedLocationName = locations.find(l => l.id === filters.locationId)?.location || "";

    return (
        <>
            <div className={`filter-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

            <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="filter-header">
                    <span></span>
                    <img src={closeIcon} className="close-filter" onClick={onClose} alt="Close" />
                </div>

                <div className="filter-content">
                    
                    <div className={`filter-group ${openSections.artist ? 'active' : ''}`}>
                        <div className="filter-item" onClick={() => toggle('artist')}>
                            Artist
                        </div>
                        <div className="f-input-wrapper">
                            <div className="f-input fake-input" onClick={() => toggle('artist')}>
                                <span>{selectedArtistName || "Select artist"}</span>
                                <span className="arrow">▼</span>
                            </div>
                            <div className="filter-dropdown">
                                <ul className="f-list">
                                    {artists.map(artist => (
                                        <li key={artist.id} onClick={() => { setArtistId(artist.id); toggle('artist'); }}>
                                            {artist.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={`filter-group ${openSections.location ? 'active' : ''}`}>
                        <div className="filter-item" onClick={() => toggle('location')}>
                            Location
                        </div>
                        <div className="f-input-wrapper">
                            <div className="f-input fake-input" onClick={() => toggle('location')}>
                                <span>{selectedLocationName || "Select location"}</span>
                                <span className="arrow">▼</span>
                            </div>
                            <div className="filter-dropdown">
                                <ul className="f-list">
                                    {locations.map(loc => (
                                        <li key={loc.id} onClick={() => { setLocationId(loc.id); toggle('location'); }}>
                                            {loc.location}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={`filter-group ${openSections.year ? 'active' : ''}`}>
                        <div className="filter-item" onClick={() => toggle('year')}>
                            Year
                        </div>
                        <div className="filter-dropdown-year">
                            <div className="year-inputs">
                                <input 
                                    type="number" 
                                    placeholder="From" 
                                    className="f-input-date" 
                                    value={filters.dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                                <input 
                                    type="number" 
                                    placeholder="To" 
                                    className="f-input-date" 
                                    value={filters.dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="filter-footer">
                    <button className="btn-show" onClick={onClose}>Show the result</button>
                    <button className="btn-clear" onClick={handleClear}>Clear</button>
                </div>
            </div>
        </>
    );
};

export default Filter;