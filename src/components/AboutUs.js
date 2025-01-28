import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          About Us
        </h2>
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700">
            We are a passionate team dedicated to making a difference in the world through our donation drives and charity work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-64">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Team member 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marni Tarun Sandeep</h3>
              <p className="text-gray-600">FrontEnd & Backend</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Team member 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manoj Varma</h3>
              <p className="text-gray-600">FrontEnd</p>
             
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our mission is simple: to provide a platform where people can come together and contribute towards making the world a better place. Through our donation drives, we hope to empower individuals to give back to their communities and support causes that matter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
