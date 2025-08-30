import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductViewr from '../components/ProductViewr';
import '../styles/Home.css';
import SolutionsAndServices from '../components/SolutionsAndServices';
import Products from '../components/Products';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const products = [
        { name: 'Magnetic Measurement', image: "https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/loBplKmolkSRjlrnomrliq/Magnetic-Measurement-Banner.png" },
        { name: 'MultiFunctional Calibrator', image: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/lqBplKmolkSRmkmoljnkip/3.png' },
        { name: 'Electrial Calibration', image: 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/llBplKmolkSRjlrnokiqiq/huaban-1-da.png' },
    ];

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

    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(autoSlide);
    }, [products.length]);

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
                <div className="carousel-wrapper">
                    <div className="carousel">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            {products.map((product, index) => (
                                <div className="carousel-card" key={index} data-name={product.name}>
                                    <img src={product.image} alt={product.name} />
                                    <div
                                        className={`carousel-name ${currentSlide === index ? 'animate-slideUpFadeIn' : ''}`}
                                    >
                                        {product.name}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Product Viewer Section */}
            <section  style={{ backgroundColor: 'rgb(246, 246, 246)', padding: '3rem 0' }}>
                <h2 className="text-5xl  text-center mb-8 text-gray-800">Featured Products</h2>
                <ProductViewr />
            </section>

            {/* Info Card Section */}
            <section className="info-card-section">
                <div className="info-card-container">
                    {/* Card 1 */}
                    <div className="info-card">
                        <img src="https://www.flir.eu/globalassets/defense/spine-pages/teaser-gov.jpg" alt="Mission" />
                        {/* <div className="info-card-content"> */}
                            {/* <h4>FOR YOUR MISSION</h4>
                            <p>
                                Stay locked-in on what’s in front of you. We’ve got your back with the powerful,
                                unrivaled advantage of best-in-class surveillance, imaging and intelligence.
                            </p> */}
                            {/* <a href="#">Learn more »</a> */}
                        {/* </div> */}
                    </div>

                    {/* Card 2 */}
                    <div className="info-card">
                        <img src="https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-industrial-2.jpg" alt="Work" />
                        {/* <div className="info-card-content"> */}
                            {/* <h4>FOR YOUR WORK</h4>
                            <p>
                                Make your machines work harder. Produce more. Repair less. Work smarter with brilliant
                                technology that makes critical decision-making clear as day.
                            </p>
                            <a href="#">Learn more »</a> */}
                        {/* </div> */}
                    </div>

                    {/* Card 3 */}
                    <div className="info-card">
                        <img src="https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-life-2.jpg" alt="Life" />
                        {/* <div className="info-card-content"> */}
                            {/* <h4>FOR YOUR LIFE</h4>
                            <p>
                                Ever wonder what it’s like to be a superhero? Seeing is unbelievable.
                            </p>
                            <a href="#">Learn more »</a> */}
                        {/* </div> */}
                    </div>
                </div>
            </section>

            {/* Solutions & Services */}
            <section>
                <SolutionsAndServices />

            </section>

            {/* Products and Load More Button */}
            <section className="contact-section">
                <h1 className="text-5xl  mb-6">Latest Products</h1>

                <Products />
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate('/moreproducts')}
                        className="bg-[#104686]  text-white font-semibold px-6 py-2 rounded-full transition"
                    >
                        View More Products
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;
