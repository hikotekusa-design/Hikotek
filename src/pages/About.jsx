import React from 'react';

const About = () => {
  const bannerImage = 'https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/llBplKmolkSRjlrnokiqiq/huaban-1-da.png';

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Banner Section */}
      <section
        className="relative h-[150px] sm:h-[250px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </section>

      {/* Centered Logo Section Below Banner */}
      <section className="bg-white flex flex-col items-center py-10 text-center">
        <img
          src="/Hikotek_Logo.png" // Replace with actual logo URL or path
          alt="Hikotek Logo"
          className="h-24 sm:h-28 object-contain drop-shadow-md mb-4"
        />
        <p className="text-lg sm:text-xl font-medium text-gray-600">
          Empowering Global Supply with Quality Mechanical Parts
        </p>
      </section>

      {/* Company Profile */}
      <section className="bg-gray-100 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase border-b-4 border-teal-600 inline-block pb-2 text-gray-800">
              Company Profile
            </h2>
          </div>

          {/* Main Box */}
          <div className="rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row bg-white">
            {/* Left: Text */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <p className="text-lg sm:text-xl leading-relaxed tracking-wide text-justify text-gray-700">
                Hikotek Mechanical Parts Distribution, founded in 2024, is a rapidly growing company specializing in the distribution of mechanical parts to both national and international clients. With a focus on efficiency and customer satisfaction, Hikotek has quickly established itself as a reliable partner in the mechanical parts supply chain.
                <br /><br />
                <span className="font-semibold">Client Base:</span><br />
                International Clients: 25<br />
                National Clients: 50
                <br /><br />
                Hikotek aims to provide high-quality products and services to its clients, including streamlined logistics and delivery. The company's operations span across international markets, reaching various countries in Europe (France, Spain, UK), North America (America, Canada), Australia, New Zealand, and parts of Asia (Singapore, Thailand).
              </p>
            </div>

            {/* Right: Full-height image */}
            <div className="md:w-1/2 h-[300px] md:h-auto">
              <img
                src="https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/ljBplKmolkSRjlnlninriq/gongsidalouxinwaiguantu.png"
                alt="Company Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 sm:px-8 pt-12 pb-60">
        <div className="max-w-7xl mx-auto relative overflow-visible bg-white shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Left: Image */}
            <div className="relative md:w-1/2 w-full h-[500px]">
              <img
                src="https://ijrorwxhqkiklq5p-static.micyjz.com/cloud/ljBplKmolkSRjlnlninriq/gongsidalouxinwaiguantu.png"
                alt="Company"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300">
                  <svg className="w-10 h-10 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Text */}
            <div className="md:w-1/2 w-full p-3 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                HIKOTEK Company Profile
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                A reliable global distributor of high-quality mechanical parts with strong logistics and international compliance.
              </p>
              <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition duration-300 w-fit">
                Introduction of Hikotek
              </button>
            </div>
          </div>

          {/* Stat Box */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 w-[50%] sm:w-[65%] bg-blue-600 p-6 rounded-lg shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-white text-center">
            <div>
              <div className="text-2xl font-bold">22</div>
              <div className="mt-1 text-sm">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold">300+</div>
              <div className="mt-1 text-sm">Equipment</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="mt-1 text-sm">International Standards</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;