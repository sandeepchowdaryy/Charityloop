import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [drives, setDrives] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "https://cfstatic.give.do/1feefb49-144a-4896-b320-5263dca8dd29.webp",
    "https://cfstatic.give.do/f1deff33-ed34-4778-8b66-acc52cffb3f2.webp",
    "https://cfstatic.give.do/c55af768-72b9-4523-a6c4-26cb35ee63fe.webp",
    "https://cfstatic.give.do/28a9c79f-f4c4-4178-8918-d0ca3f867caf.webp",
    "https://cfstatic.give.do/a04bfb99-bad7-4c33-85f9-efec5e7939a9.webp",
    "https://cfstatic.give.do/c08c4a71-9da5-4227-a96c-435997b3b5ba.webp",
  ];

  const totalSlides = carouselImages.length;

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Navigate to previous slide
  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  // Navigate to next slide
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };
  useEffect(() => {
      const fetchDrives = async () => {
        try {
          const response = await axios.get("https://charityloop.up.railway.app/donationdrive");
          const acceptedDrives = response.data.filter(
            (drive) => drive.status === "accepted"
          );
          setDrives(acceptedDrives);
        } catch (error) {
          console.error("Error fetching donation drives:", error);
        }
      };
      fetchDrives();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-red-700 text-white py-16 mb-10 rounded-lg">
        <div className="pl-48 container mx-auto text-center flex gap-20">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Give</h1>
            <p className="text-lg">
              Connecting hearts and hands to spread kindness and generosity.
            </p>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-4 gap-5">
            <a
              href="/login"
              className="bg-white text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-100"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-white text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-100"
            >
              Signup
            </a>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <section
        className="relative bg-white h-80 overflow-hidden group"
        onMouseEnter={() => clearInterval()} // Pause on hover
        onMouseLeave={() => setCurrentSlide((prevSlide) => prevSlide)} // Resume auto-slide
      >
        {/* Carousel Images */}
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-opacity opacity-0 group-hover:opacity-100"
        >
          &#9664;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-opacity opacity-0 group-hover:opacity-100"
        >
          &#9654;
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </section>
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Accepted Donation Drives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drives.length > 0 ? (
              drives.map((drive) => (
                <Link to={"/donationdrive/"+drive.id}><div
                  key={drive.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <img
                    src={`https://charityloop.up.railway.app/donationdrive/${drive.id}/image`}
                    alt={drive.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h4 className="font-bold text-lg">{drive.name}</h4>
                  <p className="text-gray-700">Status: {drive.status}</p>
                  <p className="text-gray-600">{drive.description}</p>
                </div> </Link>
                
              ))
            ) : (
              <p>No accepted donation drives available.</p>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-200 py-12 rounded-lg mt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At CharityLoop, we believe in making the world a better place by
            fostering a culture of giving. Join us in our mission to create a
            lasting impact.
          </p>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
