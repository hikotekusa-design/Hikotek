import React, { useEffect, useState } from 'react';
import Products from '../components/Products';

function MoreProdutsPg() {
  const [visibleSections, setVisibleSections] = useState(1);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const cardImages = [
    {
      url: "https://caltecharab.com/public/uploads/1739519916_0d0a2b7d-a3b9-43bf-82f1-94d1879ff3fd.__CR0,0,1940,600_PT0_SX970_V1___.jpg",
    },
    {
      url: "https://caltecharab.com/public/uploads/1739520128_images.jpg",
    },
    {
      url: "https://caltecharab.com/public/uploads/1739519977_Additel.jpg",
    },
    {
      url: "https://caltecharab.com/public/uploads/1739519993_banner-3.jpg",
    },
    {
      url: "https://caltecharab.com/public/uploads/1739520016_Datalogger.webp",
    },
    {
      url: "https://caltecharab.com/public/uploads/1739520030_Dingtalk_20210304165131_600x600.webp",
    },
  ];

  return (
    <>
      <h1 className="text-5xl font-bold px-4 md:px-16 pt-6">Latest Products</h1>

      {/* First Product Section */}
      <div className="mb-12">
        <Products />
      </div>

      {/* Second Product Section */}
      <div className="mb-16">
        <Products />
      </div>

      {/* 3 Columns x 2 Rows - Image Cards */}
      <div className="px-4 md:px-16 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardImages.map((item, idx) => (
            <div
              key={idx}
              className="h-40 bg-white rounded-lg shadow-md overflow-hidden group relative"
            >
              <img
                src={item.url}
                alt={`Card ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

       

        {/* Conditionally rendered additional <Products /> components */}
        {[...Array(visibleSections)].map((_, index) => (
          <div key={index} className="mt-12">
            <Products />
          </div>
        ))}

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleSections(visibleSections + 1)}
            className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition"
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default MoreProdutsPg;
