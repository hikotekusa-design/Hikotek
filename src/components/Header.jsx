import React, { useState } from 'react';
import '../styles/Header.css';
import HikotekLogo from '../assets/Hikotek_Logo.png';
import ProductDropdown from './ProductDropdown'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeDropdownOpen, setIsGlobeDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGlobeDropdown = () => {
    setIsGlobeDropdownOpen(!isGlobeDropdownOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span><i className="fas fa-phone-alt"></i> +91 12345 67890</span>
        </div>
        <div className="top-bar-center">
          <span><i className="fas fa-envelope"></i> info@hikotek.com</span>
        </div>
        <div className="top-bar-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Main Header */}
      <nav className="main-header">
        <div className="nav-left">
          <a href="/">
            <img src={HikotekLogo} alt="Hikotek Logo" className="logo" />
          </a>
        </div>

        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products"
              aria-label="Search"
            />
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

      {/* Nav Menu Bar (below header) */}
      <div className="nav-center-bar">
        <div className="nav-center">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <ProductDropdown />
          <a href="/contact">Contact Us</a>
          <a href="/distributor">Distributor Apply</a>
        </div>
      </div>
    </>
  );
}

export default Header;
