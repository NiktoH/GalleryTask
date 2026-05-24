import './Header.css';
import moonIcon from '../../assets/theme.svg';
import sunIcon from '../../assets/sun.svg';

const Header = ({toggleTheme, isDark}) => {
    return (
        <header className="header">
        <div className="header-container">
            <div className="header-theme">
                <button className="header-button" onClick={toggleTheme}>
                    <img src={isDark ? sunIcon : moonIcon} className="theme-image"></img>
                </button>
            </div>
            
        </div>
    </header>
    )
}

export default Header;