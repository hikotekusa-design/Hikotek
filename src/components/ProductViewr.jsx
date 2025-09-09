import React, { useEffect, useState } from 'react';
import '../styles/ProductViewer.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/productApi'

function ProductViewer() {
    const nav = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowcaseProducts = async () => {
            try {
                const result = await productApi.getShowcaseAllProducts();
                if (result.success && result.data) {
                    const processedProducts = result.data.map(product => ({
                        ...product,
                        // Convert highlight to string if it's an object
                        highlight: typeof product.highlight === 'object'
                            ? product.highlight.text || JSON.stringify(product.highlight)
                            : product.highlight
                    }));
                    setProducts(processedProducts);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                setError('Error fetching products: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShowcaseProducts();
    }, []);


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

    if (loading) {
        return (
            <div className="product-viewer">
                <div className="loading">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-viewer">
                <div className="error">
                    Error: {error}
                    <button
                        onClick={() => window.location.reload()}
                        className="view-product-button"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="product-viewer">
                <div className="no-products">No products available</div>
            </div>
        );
    }

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
                                    src={product.mainImage}
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
                                    {product?.name}
                                </motion.p>

                                {index === 2 && (
                                    <>
                                        <motion.p className="product-description">
                                            {typeof product?.highlight === 'string'
                                                ? product.highlight
                                                : product?.highlight?.text || 'Product description'}
                                        </motion.p>
                                        <motion.button
                                            className="view-product-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nav(`/products/${product.id}`);
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
