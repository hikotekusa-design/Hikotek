import React, { useState } from 'react';
import '../styles/ProductViewer.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProductViewer() {
    const nav = useNavigate();
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
        const prev2 = (currentIndex - 2 + products.length) % products.length;
        const prev1 = (currentIndex - 1 + products.length) % products.length;
        const next1 = (currentIndex + 1) % products.length;
        const next2 = (currentIndex + 2) % products.length;
        return [products[prev2], products[prev1], products[currentIndex], products[next1], products[next2]];
    };

    const visibleProducts = getVisibleProducts();

    const cardVariants = {
        farLeft: {
            scale: 0.6,
            opacity: 0.6,
            zIndex: 0,
            transition: { duration: 0.5 }
        },
        left: {
            scale: 0.8,
            opacity: 0.8,
            zIndex: 1,
            transition: { duration: 0.5 }
        },
        center: {
            scale: 1.2,
            opacity: 1,
            zIndex: 3,
            transition: { duration: 0.5 }
        },
        right: {
            scale: 0.8,
            opacity: 0.8,
            zIndex: 1,
            transition: { duration: 0.5 }
        },
        farRight: {
            scale: 0.6,
            opacity: 0.6,
            zIndex: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="product-viewer">
            <button className="nav-button prev" onClick={handlePrev}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="product-slider">
                <div className="slider-track static-layout" style={{ gap: '15px' }}> 
                    {visibleProducts.map((product, index) => {
                        const variant =
                            index === 0 ? "farLeft" :
                            index === 1 ? "left" :
                            index === 2 ? "center" :
                            index === 3 ? "right" :
                            "farRight";

                        return (
                            <motion.div
                                key={index}
                                className={`product-item ${index !== 2 ? 'clickable-card' : ''}`}
                                variants={cardVariants}
                                initial={variant}
                                animate={variant}
                                onClick={() => {
                                    if (index === 0 || index === 1) handlePrev();
                                    else if (index === 3 || index === 4) handleNext();
                                }}
                                style={{
                                    flex: index === 2 ? '0 0 35%' : '0 0 15%' 
                                }}
                            >
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    animate={{ scale: index === 2 ? 1.1 : 0.9 }}
                                />
                                <motion.p
                                    className="product-name"
                                    animate={{
                                        fontSize: index === 2 ? "1.5rem" : "1rem",
                                        opacity: index === 2 ? 1 : 0.7
                                    }}
                                >
                                    {product.name}
                                </motion.p>

                                {index === 2 && (
                                    <>
                                        <motion.p className="product-description">
                                            {product.description}
                                        </motion.p>
                                        <motion.button
                                            className="view-product-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nav('/products');
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            View Product
                                        </motion.button>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
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

export default ProductViewer;
