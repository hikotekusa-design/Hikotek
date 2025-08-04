import React, { useState } from 'react';
import '../styles/ProductViewer.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProductViewr() {

    const nav=useNavigate()
  const products = [
    { name: 'Star Safire 380X', image: "https://www.flir.eu/globalassets/imported-assets/image/380x-hd-hdc-product-images.png", description: "High-definition thermal imaging camera for advanced surveillance." },
    { name: 'Flir Mix X-Series Starter kit', image: 'https://www.flir.eu/globalassets/imported-assets/image/flir_mix_x-series_eosense_front_side.png', description: "Comprehensive starter kit for thermal imaging applications." },
    { name: 'Flir Si2', image: 'https://www.flir.eu/globalassets/industrial/instruments/condition-monitoring/acoustic-imaging/why-you-should-choose-the-flir-si2/si2-product-image.png', description: "Acoustic imaging solution for industrial diagnostics." },
    { name: 'Flir PV Kit', image: 'https://www.flir.eu/globalassets/imported-assets/image/pv-kit-2_600x625.png', description: "Portable kit for photovoltaic system inspections." },
    { name: 'Flir Ex Pro', image: 'https://www.flir.eu/globalassets/industrial/pdp-blocks/ex-xt/e8-pro-alt.png', description: "Professional-grade thermal camera with enhanced features." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const getVisibleProducts = () => {
    const prev = (currentIndex - 1 + products.length) % products.length;
    const next = (currentIndex + 1) % products.length;
    return [products[prev], products[currentIndex], products[next]];
  };

  const visibleProducts = getVisibleProducts();

  return (
    
    <div className="product-viewer">
      
      <button className="nav-button prev" onClick={handlePrev}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="product-slider">
        <div className="slider-track static-layout">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={index}
              className="product-item"
              initial={{ opacity: 0 }}
              animate={{
                scale: index === 1 ? 1.2 : 0.9,
                opacity: 1,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{
                  scale: index === 1 ? 1.1 : 0.95,
                  opacity: 1,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.p
                className="product-name"
                animate={{
                  scale: index === 1 ? 1.2 : 1,
                  fontSize: index === 1 ? "1.5rem" : "1rem",
                  opacity: index === 1 ? 1 : 0.7,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {product.name}
              </motion.p>
              <motion.p
                className="product-description"
                animate={{
                  opacity: index === 1 ? 1 : 0.6,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {product.description}
              </motion.p>
              <motion.button
                className="view-product-button"
                animate={{
                  opacity: index === 1 ? 1 : 0.3,
                  scale: index === 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={() => nav('/products')} // Placeholder action
              >
                View Product
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="nav-button next" onClick={handleNext}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default ProductViewr;