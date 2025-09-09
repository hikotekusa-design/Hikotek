import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import HikotekLogo from "../assets/Hikotek_Logo.png";
import ProductDropdown from "./ProductDropdown";
import GlobeMap from "./GlobeMap";
import { productApi } from "../services/productApi";
import { publicFooterApi } from '../services/FooterApi';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeDropdownOpen, setIsGlobeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  // Fetch footer data
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await publicFooterApi.getActiveFooter();
        
        if (response.success) {
          setFooterData(response.data);
        } else {
          setError('Failed to load footer data');
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer information');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Close results dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleGlobeDropdown = () => setIsGlobeDropdownOpen(!isGlobeDropdownOpen);
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProductsClick = () => {
    if (isMobile) {
      navigate("/moreproducts");
      setIsMenuOpen(false);
    }
  };

  // Perform search when clicking the search button
  const performSearch = async () => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await productApi.searchProducts(searchTerm);
      setSearchResults(response.data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  // When clicking on a product name, go to details page
  const handleResultClick = (productId) => {
    navigate(`/products/${productId}`);
    setShowResults(false);
    setSearchTerm("");
  };

  // Get email from footer data or use fallback
  const contactEmail = footerData?.email || "info@hikotek.com";

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>Need help? Email us: {contactEmail}</span>
        </div>
        <div className="top-bar-right">
          {footerData?.facebook && (
            <a href={footerData.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
          )}
          {footerData?.instagram && (
            <a href={footerData.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          )}
          {footerData?.twitter && (
            <a href={footerData.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {footerData?.youtube && (
            <a href={footerData.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className="header-container">
        <nav className="main-header">
          <div className="nav-left">
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
            <a href="/">
              <img src={HikotekLogo} alt="Hikotek Logo" className="logo" />
            </a>
          </div>

          {/* Search Bar */}
          <div className="search-bar-container" ref={searchRef}>
            <form
              className="search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                performSearch();
              }}
            >
              <input
                type="text"
                placeholder="Search products"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="search-results-dropdown">
                {isSearching ? (
                  <div className="search-result-item">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="search-result-item"
                        onClick={() => handleResultClick(product.id)}
                      >
                        <div className="product-name">
                          {product.name || "Unnamed Product"}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="search-result-item">No products found</div>
                )}
              </div>
            )}
          </div>

          <div className="nav-right">
            <div className="globe-dropdown">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#104686"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-10"
                onClick={toggleGlobeDropdown}
              >
                <circle cx="32" cy="32" r="30" />
                <ellipse cx="32" cy="32" rx="14" ry="30" />
                <path d="M2 24 C18 16, 46 16, 62 24" />
                <path d="M2 40 C18 48, 46 48, 62 40" />
                <line x1="32" y1="2" x2="32" y2="62" />
                <line x1="2" y1="32" x2="62" y2="32" />
              </svg>
            </div>
          </div>
        </nav>

        {/* Nav Menu Bar */}
        <div className={`nav-center-bar ${isMenuOpen ? "mobile-open" : ""}`}>
          <div className="nav-center">
            <div className="nav-item">
              <a href="/" onClick={toggleMobileMenu}>
                Home
              </a>
            </div>
            <div className="nav-item">
              {isMobile ? (
                <a href="/moreproducts" onClick={handleProductsClick}>
                  Products
                </a>
              ) : (
                <ProductDropdown />
              )}
            </div>
            <div className="nav-item gap-2">
              <a href="/about" onClick={toggleMobileMenu}>
                About Us
              </a>
            </div>
            <div className="nav-item">
              <a href="/contact" onClick={toggleMobileMenu}>
                Contact Us
              </a>
            </div>
            <div className="nav-item">
              <a href="/distributor" onClick={toggleMobileMenu}>
                Join our Network
              </a>
            </div>
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