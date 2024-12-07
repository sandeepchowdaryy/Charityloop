import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Contact Us
        </h2>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h3>
            <p className="text-lg text-gray-700 mb-6">
              We’d love to hear from you! Whether you have questions or just want to say hello, feel free to reach out.
            </p>
            <div>
              <p className="text-gray-700 font-medium">Email:</p>
              <p className="text-gray-600">contact@ourcompany.com</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 font-medium">Phone:</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 font-medium">Address:</p>
              <p className="text-gray-600">123 Main Street, Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg">
              {/* Map for Vijayawada, Andhra Pradesh */}
              <iframe
                title="Vijayawada Location"
                className="w-full h-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8256158961675!2d80.6167430147603!3d16.50674288824958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34e4c8068048db%3A0xa22d1be6d7e98b3d!2sVijayawada%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1678187775556!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
          <form action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
