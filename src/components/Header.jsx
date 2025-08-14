import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import HikotekLogo from '../assets/Hikotek_Logo.png';
import ProductDropdown from './ProductDropdown';
import GlobeMap from './GlobeMap';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeDropdownOpen, setIsGlobeDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const toggleGlobeDropdown = () => setIsGlobeDropdownOpen(!isGlobeDropdownOpen);
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProductsClick = () => {
    if (isMobile) {
      navigate('/moreproducts');
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>Need help? Email us : info@hikotek.com</span>
        </div>
        <div className="top-bar-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-container">
        <nav className="main-header">
          <div className="nav-left">
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            <a href="/">
              <img src={HikotekLogo} alt="Hikotek Logo" className="logo" />
            </a>
          </div>

          <div className="search-bar-container">
            <div className="search-bar">
              <input type="text" placeholder="Search products" aria-label="Search" />
              <button type="button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="nav-right">
            <div className="globe-dropdown">
              <i className="fas fa-globe" onClick={toggleGlobeDropdown}></i>
            </div>
          </div>
        </nav>

        {/* Nav Menu Bar */}
        <div className={`nav-center-bar ${isMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-center">
            <a href="/" onClick={toggleMobileMenu}>Home</a>
            <a href="/about" onClick={toggleMobileMenu}>About Us</a>
            {isMobile ? (
              <a href="/moreproducts" onClick={handleProductsClick}>Products</a>
            ) : (
              <ProductDropdown />
            )}
            <a href="/contact" onClick={toggleMobileMenu}>Contact Us</a>
            <a href="/distributor" onClick={toggleMobileMenu}>Distributor Apply</a>
          </div>
        </div>
      </header>

      {/* Modal for Globe */}
      <GlobeMap 
        isOpen={isGlobeDropdownOpen} 
        onClose={() => setIsGlobeDropdownOpen(false)} 
      />
    </>
  );
}

export default Header;