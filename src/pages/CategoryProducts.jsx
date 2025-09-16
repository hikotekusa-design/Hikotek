import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { productApi } from '../services/productApi';

// Helper function to safely extract text from highlight
const getHighlightText = (highlight) => {
  if (typeof highlight === 'string') return highlight;
  if (Array.isArray(highlight)) return highlight[0] || 'No highlights available';
  if (highlight && typeof highlight === 'object') {
    return highlight.text || highlight.title || highlight.description || 
           highlight.value || 'No highlights available';
  }
  return 'No highlights available';
};

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
        {/* <h3 className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">
          {getHighlightText(product.highlights)}
        </h3> */}
      </div>
    </div>
  </Link>
);

function CategoryProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]); // Can be array (no subcategories) or object (with subcategories)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = location.state?.category;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getShowcaseAllProducts();
      if (response.success) {
        // Filter products by category if provided, else show all
        const filtered = category
          ? response.data.filter(product => 
              product.category && product.category.toLowerCase() === category.toLowerCase()
            )
          : response.data;

        // Check if any products have a non-empty subcategory
        const hasSubcategories = filtered.some(product => product.subcategory && product.subcategory.trim());

        if (hasSubcategories) {
          // Group products by subcategory
          const groupedBySubcategory = filtered.reduce((acc, product) => {
            const subcat = product.subcategory?.trim() || 'No Subcategory';
            if (!acc[subcat]) {
              acc[subcat] = [];
            }
            acc[subcat].push(product);
            return acc;
          }, {});
          setProducts(groupedBySubcategory);
        } else {
          // No subcategories, store as array
          setProducts(filtered);
        }
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
            onClick={fetchProducts}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasProducts = Array.isArray(products) ? products.length > 0 : Object.values(products).some(group => group.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {category ? `${category} Products` : 'All Products'}
      </h1>

      {hasProducts ? (
        Array.isArray(products) ? (
          // No subcategories, render all products in a single grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Subcategories exist, render grouped by subcategory
          Object.entries(products).map(([subcategory, group]) => (
            <div key={subcategory} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-left border-b border-gray-300 pb-2">
                {subcategory}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {category ? `No products found in ${category} category` : 'No products available'}
          </p>
          {category && (
            <Link 
              to="/moreproducts" 
              className="text-blue-900 hover:text-blue-700 mt-4 inline-block"
            >
              View all products
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;