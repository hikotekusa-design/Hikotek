import React from 'react';
// import HikotekLogo from '/Hikotek_Logo.png'
import '../styles/Header.css';
import '../styles/DistributorApply.css'



const DistributorApply = () => {
    const products = [
        {
            name: 'Vernier Caliper',
            image: 'https://www.faithfulltools.com/images/full/FAICALVER.jpg',
        },
        {
            name: 'Digital Torque Driver',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkmmhpHTq408nP2US0CqAitsA6RWHSKUb0A&s',
        },
        {
            name: 'PB 8326 Set A1',
            image: 'https://goodwill.in/pub/media/catalog/product/cache/affde3bad6fff216fce8dd9a3ef91de9/p/b/pb_8326.png',
        },
        {
            name: 'Jetech Bits',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtv6_1kyROIOuD_FEkduwbdHy6yGD4ZauaA&s',
        },
        {
            name: 'Mechanical External Micrometer',
            image: 'https://bakergauges.com/wp-content/uploads/2015/08/prod-feat-micromet-mech-0-200-2b.jpg',
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            {/* <div className="logo-container p-4">
                <img
                    className="logo"
                    src={HikotekLogo}
                    alt="Hikotek Logo"
                />
            </div> */}
            {/* --- Product Scrolling Section --- */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Products</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                        {/* <p className="mt-4 text-lg text-blue-800">High-quality tools trusted by professionals worldwide</p> */}
                    </div>

                    <div className="relative overflow-hidden">
                        <div className="flex animate-marquee whitespace-nowrap gap-8 py-4">
                            {[...products, ...products].map((item, i) => (
                                <div key={i} className="inline-flex flex-col items-center w-56 px-4 py-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-40 h-40 mb-4 p-2 bg-white rounded-lg flex items-center justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                    <p className="text-lg font-medium text-blue-900 text-center w-full truncate px-2">
                                        {item.name.length > 25 ? `${item.name.substring(0, 22)}...` : item.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Client Logos --- */}
            <section className="py-16 bg-blue-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Clients</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 px-4">
                        {[1, 2, 3, 4, 5].map((client, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                <img
                                    src={`https://via.placeholder.com/150x80?text=Client+${i + 1}`}
                                    alt={`Client ${i + 1}`}
                                    className="h-12 object-contain opacity-80 hover:opacity-100 transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Distributor Form --- */}
           

           
            {/* --- Testimonials --- */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">Client Success Stories</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                        <p className="mt-4 text-lg text-blue-800 max-w-2xl mx-auto">
                            Hear what our partners say about working with us
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                quote: "Hikotek's dedication to quality and service stands out. Their team is knowledgeable, responsive, and ensures specific needs are met.",

                            },
                            {
                                quote: "Hikotek has exceeded expectations as a reliable partner for mechanical components. Their expertise in electromechanical assemblies is exceptional.",

                            },
                            {
                                quote: "Hikotek provides a customer-centric experience with highly communicative teams. They provide fast turnaround times and tailored solutions.",

                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 relative">
                                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <p className="italic text-lg text-gray-700 mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    {/* <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-bold">
                                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div> */}
                                    {/* <div>
                                        <h4 className="font-semibold text-blue-900">{testimonial.author}</h4>
                                        <p className="text-blue-600 text-sm">{testimonial.position}</p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DistributorApply;