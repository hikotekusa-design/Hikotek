import React from 'react';
import { FaShoppingCart, FaRegHeart, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const products = [
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

const ProductCard = ({ product }) => (
  <Link to="/products">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white min-h-[380px] group cursor-pointer">

      {/* Image */}
      <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain" />

      {/* Stars */}
      <div className="flex justify-center mt-3">
        {Array(5).fill().map((_, idx) => (
          <span key={idx} className="text-yellow-400">&#9733;</span>
        ))}
      </div>

      {/* Brand */}
      <div className="text-center text-sm mt-1 text-gray-500">{product.brand}</div>

      {/* Title */}
      <div className="text-center font-medium text-sm mt-1 px-1 line-clamp-2">{product.title}</div>

      {/* Button & Price */}
      <div className="mt-3 text-center">
        <button className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2 mx-auto">
          Enquiry Now
        </button>
        <div className="mt-2 font-bold text-blue-900">{product.price}</div>
      </div>
    </div>
  </Link>
);

const Products = () => {
  return (
    <div className="py-10 px-4 md:px-16 xl:px-32 bg-gray-100 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 group">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
