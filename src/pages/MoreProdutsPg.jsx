
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { productApi } from '../services/productApi';

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
  <Link to={`/products/${product.id}`} className="block">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white h-full flex flex-col product-card">
      <div className="flex-grow">
        <img 
          src={product.mainImage} 
          alt={product.name} 
          className="h-48 w-full object-contain mx-auto"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200';
          }}
        />
        <div className="text-center text-xl mt-1 font-semibold">{product.name}</div>
        <h3 className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
          {product.highlight}
        </h3>
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
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400x300';
      }}
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShowcaseProducts();
  }, []);

  const fetchShowcaseProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getShowcaseAllProducts();
      console.log('API Response:', response); // Debug log
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchShowcaseProducts}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold px-4 md:px-8 pt-6 pb-4 text-center">
        Latest Products
      </h1>
      
      <div className="px-4 md:px-8 pb-12 space-y-12">
        {products.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-6">Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardImages.map((item, index) => (
              <ImageCard key={`category-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          height: 380px;
        }
        
        @media (max-width: 640px) {
          .product-card {
            height: 360px;
          }
        }
      `}</style>
    </div>
  );
}

export default MoreProductsPg;
