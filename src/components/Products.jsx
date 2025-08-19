import React from 'react';
import { FaShoppingCart, FaRegHeart, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-243-30 Digimatic Micrometer, Range 75",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68164f63503fc.webp",
    price: "USD 1,140.00"
  },
  {
    id: 2,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-250-30 Coolant Proof Digital Micrometer",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/681654793e931.webp",
    price: "USD 2,340.00"
  },
  {
    id: 3,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-251-30 Coolant Proof Micrometer Range",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68165b1fdd921.jpeg",
    price: "USD 2,385.00"
  },
  {
    id: 4,
    brand: "Mitutoyo",
    title: "Mitutoyo 293-252-30 Digital Coolant Proof Micromet",
    image: "https://caltecharab.com/public/uploads/images/04-05-2025/68173a0972d2b.jpeg",
    price: "USD 2,325.00"
  },
  {
    id: 5,
    brand: "Other Brand",
    title: "TempU08 Single Use Temperature Data Logger Range",
    image: "https://caltecharab.com/public/uploads/images/03-05-2025/68165e0171aad.webp",
    price: "USD 65.00"
  },
  {
    id: 6,
    brand: "Other Brand",
    title: "TempU08 Single Use Temperature Data Logger Range",
    image: "https://caltecharab.com/public/uploads/images/04-05-2025/68173a0972d2b.jpeg",
    price: "USD 65.00"
  },
];

const ProductCard = ({ product }) => (
  <Link to="/products">
    <div className="relative border p-4 rounded shadow-sm hover:shadow-md transition duration-300 bg-white min-h-[380px] group cursor-pointer">

      {/* Image */}
      <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain" />

      

      {/* Brand */}
      <div className="text-center text-2xl text-black mt-1 ">{product.brand}</div>

      {/* Title */}
      <div className="text-center font-medium text-sm mt-1 px-1 line-clamp-2 text-gray-500">{product.title}</div>

      {/* Button & Price */}
      <div className="mt-3 text-center">
        {/* <button className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2 mx-auto">
          Enquiry Now
        </button> */}
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
