import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; // Keep styles if you're reusing them

const GallerySlider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsPerView = windowWidth <= 768 ? 1 : 3;
  const maxSlide = Math.max(0, Math.ceil(products.length - cardsPerView));

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="gallery-container relative w-full overflow-hidden py-6">
      <div className="gallery-slider relative">
        <div
          className="gallery-track flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * (windowWidth <= 768 ? 260 : 310)}px)`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="gallery-card bg-white border rounded-lg shadow-md m-2 p-4 min-w-[260px] md:min-w-[300px] text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain mx-auto mb-2"
              />
              <p className="font-semibold">{product.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="gallery-nav prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full disabled:opacity-50"
        onClick={prevSlide}
        disabled={currentSlide === 0}
      >
        ◀
      </button>

      <button
        className="gallery-nav next absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full disabled:opacity-50"
        onClick={nextSlide}
        disabled={currentSlide >= maxSlide}
      >
        ▶
      </button>
    </div>
  );
};

export default GallerySlider;
