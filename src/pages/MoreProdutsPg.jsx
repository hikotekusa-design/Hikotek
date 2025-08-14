import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const initialProducts = [
  {
    id: 1,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-243-30 Digimatic Micrometer, Range 75",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68164f63503fc.webp",
    price: "SAR 1,140.00"
  },
  {
    id: 2,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-250-30 Coolant Proof Digital Micrometer",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/681654793e931.webp",
    price: "SAR 2,340.00"
  },
  {
    id: 3,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-251-30 Coolant Proof Micrometer Range",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68165b1fdd921.jpeg",
    price: "SAR 2,385.00"
  },
  {
    id: 4,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-252-30 Digital Coolant Proof Micromet",
    image: "https://caltecharab.com/public/uploads/images/04-05-2025/68173a0972d2b.jpeg",
    price: "SAR 2,325.00"
  },
  {
    id: 5,
    brand: "Other Brand",
    title: "TempU08 Single Use Temperature Data Logger Range",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68165e0171aad.webp",
    price: "SAR 65.00"
  },
  {
    id: 6,
    brand: "Other Brand",
    title: "TempU08 Single Use Temperature Data Logger Range",
    image: "https://caltecharab.com/public/uploads/images/04-05-2025/68173a0972d2b.jpeg",
    price: "SAR 65.00"
  },
];

const additionalProducts = [
  {
    id: 7,
    brand: "Fluke",
    title: "Fluke 87V Industrial Multimeter",
    image: "https://caltecharab.com/public/uploads/images/multimeter.webp",
    price: "SAR 1,850.00"
  },
  {
    id: 8,
    brand: "Flir",
    title: "FLIR E8 Thermal Imaging Camera",
    image: "https://caltecharab.com/public/uploads/images/thermal-camera.webp",
    price: "SAR 8,999.00"
  },
  {
    id: 9,
    brand: "Keysight",
    title: "Keysight Oscilloscope 2000X Series",
    image: "https://caltecharab.com/public/uploads/images/oscilloscope.webp",
    price: "SAR 12,500.00"
  },
];

// Image card data
const cardImages = [
  {
    url: "https://caltecharab.com/public/uploads/1739519916_0d0a2b7d-a3b9-43bf-82f1-94d1879ff3fd.__CR0,0,1940,600_PT0_SX970_V1___.jpg",
    title: "Industrial Solutions"
  },
  {
    url: "https://caltecharab.com/public/uploads/1739520128_images.jpg",
    title: "Measurement Tools"
  },
  {
    url: "https://caltecharab.com/public/uploads/1739519977_Additel.jpg",
    title: "Calibration Devices"
  },
  {
    url: "https://caltecharab.com/public/uploads/1739519993_banner-3.jpg",
    title: "Testing Equipment"
  },
  {
    url: "https://caltecharab.com/public/uploads/1739520016_Datalogger.webp",
    title: "Data Loggers"
  },
  {
    url: "https://caltecharab.com/public/uploads/1739520030_Dingtalk_20210304165131_600x600.webp",
    title: "Precision Instruments"
  },
];

// Product Card Component
const ProductCard = ({ product }) => (
  <Link to={`/products`} className="block">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white h-full flex flex-col">
      <div className="flex-grow">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-48 w-full object-contain mx-auto"
        />
        <div className="text-center text-xl mt-1 font-semibold">{product.brand}</div>
        <h3 className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
          {product.title}
        </h3>
      </div>
      <div className="mt-3 text-center">
        <div className="mt-2 font-bold text-blue-900 text-lg">{product.price}</div>
      </div>
    </div>
  </Link>
);

// Image Card Component
const ImageCard = ({ item }) => (
  <div className="h-48 sm:h-56 bg-white rounded-lg shadow-md overflow-hidden group relative hover:shadow-lg transition-shadow duration-300">
    <img
      src={item.url}
      alt={item.title || "Product image"}
      className="w-full h-full object-cover"
    />
    {item.title && (
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-semibold">{item.title}</h3>
      </div>
    )}
  </div>
);

// Main Component
function MoreProductsPg() {
  const [displayedProducts, setDisplayedProducts] = useState([...initialProducts]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadMoreProducts = () => {
    const newProducts = [...displayedProducts, ...additionalProducts];
    setDisplayedProducts(newProducts);
    setHasMoreProducts(false); 
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold px-4 md:px-8 pt-6 pb-4 text-center">
        Latest Products
      </h1>
      
      <div className="px-4 md:px-8 pb-12 space-y-12">
        {/* Section 1: First 3 Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.slice(0, 3).map(product => (
              <ProductCard key={`featured-${product.id}`} product={product} />
            ))}
          </div>
        </div>

        {/* Section 2: Next 3 Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.slice(3, 6).map(product => (
              <ProductCard key={`popular-${product.id}`} product={product} />
            ))}
          </div>
        </div>

        {/* Section 3: All 6 Image Cards */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardImages.map((item, index) => (
              <ImageCard key={`category-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Section 4: Final 3 Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.slice(0, 3).map(product => (
              <ProductCard key={`recommended-${product.id}`} product={product} />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {hasMoreProducts && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreProducts}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
            >
              Load More Products
            </button>
          </div>
        )}

        {displayedProducts.length > 6 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">More Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.slice(6).map(product => (
                <ProductCard key={`more-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoreProductsPg;