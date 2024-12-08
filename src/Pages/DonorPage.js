import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const DonorPage = () => {
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

  // Fetch donation drives with status "accepted"
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

  // Carousel Logic: Auto-switch slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel Section */}
      <section className="relative bg-white h-80 overflow-hidden">
        {/* Carousel Images */}
        <div
          className="absolute inset-0 flex space-x-4 px-4  transition-transform duration-700"
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
                className="w-[100%] h-full object-cover"
              />
            </div>
          ))}
        </div>

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

      {/* Information and Actions Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto flex flex-wrap items-center">
          {/* Left Side Text */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Give Monthly</h2>
            <p className="text-gray-700 text-lg">
              Create sustained impact. Support verified projects. Get regular
              updates. Save tax. Cancel anytime.
            </p>
          </div>

          {/* Right Side Buttons */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end space-x-4">
            <Link to="/donationDrives">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                Create Drive
              </button>
            </Link>

            <Link to="/donate">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Donate now
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Accepted Donation Drives */}
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
    </div>
  );
};

export default DonorPage;
