import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductViewr from '../components/ProductViewr';
import '../styles/Home.css';
import SolutionsAndServices from '../components/SolutionsAndServices';
import Products from '../components/Products';
import { HomeApi } from '../services/HomeApi'; // Import the HomeApi

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [index, setIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState([]);
    const [topImages, setTopImages] = useState([]);
    const [loading, setLoading] = useState({
        carousel: true,
        topImages: true
    });
    const [error, setError] = useState({
        carousel: null,
        topImages: null
    });
    const navigate = useNavigate();

    // Fallback products if API fails
    // const fallbackProducts = [
    //     { 
    //         name: 'Magnetic Measurement', 
    //         imageUrl: "https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/loBplKmolkSRjlrnomrliq/Magnetic-Measurement-Banner.png",
    //         title: 'Magnetic Measurement'
    //     },
    //     { 
    //         name: 'MultiFunctional Calibrator', 
    //         imageUrl: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/lqBplKmolkSRmkmoljnkip/3.png',
    //         title: 'MultiFunctional Calibrator'
    //     },
    //     { 
    //         name: 'Electrial Calibration', 
    //         imageUrl: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/llBplKmolkSRjlrnokiqiq/huaban-1-da.png',
    //         title: 'Electrial Calibration'
    //     },
    // ];

    // const fallbackTopImages = [
    //     {
    //         imageUrl: "https://www.flir.eu/globalassets/defense/spine-pages/teaser-gov.jpg",
    //         title: "Mission"
    //     },
    //     {
    //         imageUrl: "https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-industrial-2.jpg",
    //         title: "Work"
    //     },
    //     {
    //         imageUrl: "https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-life-2.jpg",
    //         title: "Life"
    //     }
    // ];

    const testimonials = [
        "Hikotek's dedication to quality and service stands out. Their team is knowledgeable, responsive, and ensures specific needs are met. Customers can always count on on-time deliveries and excellent support",
        "Hikotek has exceeded expectations as a reliable partner for mechanical components. They offer a wide range of products, and their expertise in electromechanical assemblies is exceptional. Their commitment to quality control and efficiency has helped streamline production processes and ensure products meet the highest standards.",
        "Hikotek provides a customer-centric experience with highly communicative teams. They provide fast turnaround times and offer tailored solutions to address unique challenges. Hikotek delivers with precision and dependability, allowing customers to focus on core business operations, whether for prototypes or high-volume production"
    ];

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch carousel data
    useEffect(() => {
        const fetchCarousel = async () => {
            try {
                const response = await HomeApi.getPublicCarousel();
                const items = response.data || [];
                setCarouselItems(items.length > 0 ? items : fallbackProducts);
            } catch (err) {
                console.error('Error fetching carousel:', err);
                setError(prev => ({...prev, carousel: 'Failed to load carousel'}));
                setCarouselItems(fallbackProducts);
            } finally {
                setLoading(prev => ({...prev, carousel: false}));
            }
        };
        fetchCarousel();
    }, []);

    // Fetch top images data
    useEffect(() => {
        const fetchTopImages = async () => {
            try {
                const response = await HomeApi.getPublicTopImages();
                const images = response.data || [];
                setTopImages(images.length > 0 ? images : fallbackTopImages);
            } catch (err) {
                console.error('Error fetching top images:', err);
                setError(prev => ({...prev, topImages: 'Failed to load featured content'}));
                setTopImages(fallbackTopImages);
            } finally {
                setLoading(prev => ({...prev, topImages: false}));
            }
        };
        fetchTopImages();
    }, []);

    // Auto slide for carousel
    useEffect(() => {
        if (carouselItems.length > 0) {
            const autoSlide = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
            }, 3000);
            return () => clearInterval(autoSlide);
        }
    }, [carouselItems.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="nav-container">
            {/* Carousel Section */}
            <div className="carousel-container">
                {loading.carousel && <div className="carousel-loading">Loading carousel...</div>}
                {error.carousel && <div className="carousel-error">{error.carousel}</div>}
                
                {!loading.carousel && carouselItems.length > 0 && (
                    <div className="carousel-wrapper">
                        <div className="carousel">
                            <div
                                className="carousel-track"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out',
                                }}
                            >
                                {carouselItems.map((item, index) => (
                                    <div className="carousel-card" key={index} data-name={item.title || item.name}>
                                        <img src={item.imageUrl} alt={item.title || item.name} />
                                        <div
                                            className={`carousel-name ${currentSlide === index ? 'animate-slideUpFadeIn' : ''}`}
                                        >
                                            {item.title || item.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Viewer Section */}
            <section style={{ backgroundColor: 'rgb(246, 246, 246)', padding: '3rem 0' }}>
                <h2 className="text-5xl text-center mb-8 text-gray-800">Featured Products</h2>
                <ProductViewr />
            </section>

            {/* Info Card Section (Using Top Images) */}
            <section className="info-card-section">
                {loading.topImages && <div className="top-images-loading">Loading featured content...</div>}
                {error.topImages && <div className="top-images-error">{error.topImages}</div>}
                
                {!loading.topImages && topImages.length > 0 && (
                    <div className="info-card-container">
                        {topImages.map((item, index) => (
                            <div className="info-card" key={index}>
                                <img src={item.imageUrl} alt={item.title} />
                                {item.title && (
                                    <div className="info-card-content">
                                        <h3>{item.title}</h3>
                                        {item.description && <p>{item.description}</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Solutions & Services */}
            <section>
                <SolutionsAndServices />
            </section>

            {/* Products and Load More Button */}
            <section className="contact-section">
                <h1 className="text-6xl mb-6">Latest Products</h1>

                <Products />
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate('/moreproducts')}
                        className="bg-[#104686] text-white font-semibold px-6 py-2 rounded-full transition"
                    >
                        View More Products
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;