import './Search.css';
import searchIcon from '../../assets/icon-1.svg';
import filterIcon from '../../assets/filter-icon.svg';
import searchDark from '../../assets/search-dark.svg';
import filterDark from '../../assets/filter-icon-dark.svg';

const Search = ({isDark, handleSearch, isOpen}) => {
    return(
            <div className="search-section">
        <div className="search-container">
            <div className="search-main">
                <img src={isDark ? searchIcon : searchDark} className="search-icon"></img>
                <input type="text" placeholder="Поиск..." className="search-input" onChange={(e) => handleSearch(e.target.value)}></input>
            </div>
        </div>
    
        <button className="filter-trigger" onClick={isOpen}>
            <img src={isDark ? filterIcon : filterDark} alt="Filter" className="filter-icon"></img>
        </button>
    </div>

    
    )
}

export default Search;