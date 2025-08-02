import React, { useEffect, useState } from 'react';
import ProductViewr from '../components/ProductViewr';
import ProductDropdown from '../components/ProductDropdown';
import '../styles/Home.css';
import SolutionsAndServices from '../components/SolutionsAndServices';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [index, setIndex] = useState(0);

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
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const scrollToContact = () => {
        document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            
            <div className="nav-container">
                

                <div className="carousel-container">
                    <div className="carousel-wrapper">
                        <div className="carousel">
                            <div
                                className="carousel-track"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                {products.map((product, index) => (
                                    <div className="carousel-card" key={index} data-name={product.name}>
                                        <img src={product.image} alt={product.name} />
                                        <div className="carousel-name">{product.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="welcome-section">
                    <h1>Welcome to Hikotek</h1>
                    <p>
                        Welcome to Hikotek! It is a leading manufacturer and exporter of innovative security and visual
                        management solutions. The company is dedicated to providing global customers with top-quality
                        products and excellent service, backed by its commitment to research and development and stringent
                        quality control processes. Explore the wide range of products and experience the Hikotek difference.
                    </p>
                </div>

                <section>
                    <ProductViewr />
                </section>

                <section className="info-card-section">
                    <div className="info-card-container">
                        <div className="info-card">
                            <img src="https://www.flir.eu/globalassets/defense/spine-pages/teaser-gov.jpg" alt="Mission" />
                            <div className="info-card-content">
                                <h4>FOR YOUR MISSION</h4>
                                <p>
                                    Stay locked-in on what’s in front of you. We’ve got your back with the powerful,
                                    unrivaled advantage of best-in-class surveillance, imaging and intelligence.
                                </p>
                                <a href="#">Learn more »</a>
                            </div>
                        </div>

                        <div className="info-card center-card">
                            <img src="https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-industrial-2.jpg" alt="Work" />
                            <div className="info-card-content">
                                <h4>FOR YOUR WORK</h4>
                                <p>
                                    Make your machines work harder. Produce more. Repair less. Work smarter with brilliant
                                    technology that makes critical decision-making clear as day.
                                </p>
                                <a href="#">Learn more »</a>
                            </div>
                        </div>

                        <div className="info-card">
                            <img src="https://www.flir.eu/globalassets/industrial/teaser-blocks/teaser-life-2.jpg" alt="Life" />
                            <div className="info-card-content">
                                <h4>FOR YOUR LIFE</h4>
                                <p>
                                    Ever wonder what it’s like to be a superhero? Seeing is unbelievable.
                                </p>
                                <a href="#">Learn more »</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section>
                    <div className="testimonial-slider">
                        <h2 className="testimonial-title">What Our Customers Say</h2>
                        <div className="testimonial-card">
                            <p className="testimonial-quote">“{testimonials[index]}”</p>
                        </div>
                        <div className="testimonial-dots">
                            {testimonials.map((_, i) => (
                                <span
                                    key={i}
                                    className={`dot ${i === index ? 'active' : ''}`}
                                    onClick={() => setIndex(i)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </section> */}

                <SolutionsAndServices/>

                <section>
                    <div className="contact-section">
                        <h2>Contact Us</h2>
                        <p>Email: <a href="mailto:example@gmail.com">example@gmail.com</a></p>
                        <div className="map-container">
                            <iframe
                                title="Hikotek Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019830076872!2d144.96305831531657!3d-37.81410797975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f7b64e2f%3A0xc7b3b5f4f07e62e6!2sFederation%20Square!5e0!3m2!1sen!2sin!4v1615923173654!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
