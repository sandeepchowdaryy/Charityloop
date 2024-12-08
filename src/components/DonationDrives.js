import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DonationDrives = () => {
  const [donationDrive, setDonationDrive] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [donationDrives, setDonationDrives] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDrive({ ...donationDrive, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchDonationDrives = async () => {
    try {
      //hello
      const response = await axios.get("https://charityloop.up.railway.app/donationdrive");
      setDonationDrives(response.data);
    } catch (error) {
      console.error("Error fetching donation drives:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "donationDrive",
      new Blob([JSON.stringify(donationDrive)], { type: "application/json" })
    );
    formData.append("imageFile", image);

    try {
      const response = await axios.post(
        //hello
        "https://charityloop.up.railway.app/donationdrive",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Donation drive created:", response.data);
      alert("Donation drive created successfully");
      fetchDonationDrives(); // Refresh the list
      setDonationDrive({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setImage(null);
      setShowForm(false); // Close the form after submission
    } catch (error) {
      console.error("Error creating donation drive:", error);
      alert("Error creating donation drive");
    }
  };

  useEffect(() => {
    fetchDonationDrives();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {showForm ? "Close Form" : "Create Donation Drive"}
      </button>

      {showForm && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Create Donation Drive
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={donationDrive.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                value={donationDrive.description}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={donationDrive.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={donationDrive.endDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Drive
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {donationDrives
          .filter((drive) => drive.status === "accepted") // Filter for accepted donation drives
          .map((drive) => (
            <Link to={"/donationdrive/"+drive.id}>
            <div
              key={drive.id}
              className="border border-gray-300 rounded-lg shadow-lg p-2"
            >
              <img
              //hello
                src={`https://charityloop.up.railway.app/donationdrive/${drive.id}/image`}
                alt={drive.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{drive.name}</h3>
              <p className="text-gray-700 text-[15px]">{drive.description}</p>
              <p className="text-[12px] text-gray-500 mt-2">
                {drive.startDate} - {drive.endDate}
              </p>
              <p className="text-sm text-green-500 mt-2">
                {drive.status} 
              </p>
            </div>
            </Link>
          ))}
      </div>
      <h1 className="text-3xl font-semibold mt-10">Ended Donation Drives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {donationDrives
          .filter((drive) => drive.status === "rejected") // Filter for accepted donation drives
          .map((drive) => (
      
            <div
              key={drive.id}
              className="border border-gray-300 rounded-lg shadow-lg p-2"
            >
              <img
              //hello
                src={`https://charityloop.up.railway.app/donationdrive/${drive.id}/image`}
                alt={drive.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{drive.name}</h3>
              <p className="text-gray-700 text-[15px]">{drive.description}</p>
              <p className="text-[12px] text-gray-500 mt-2">
                {drive.startDate} - {drive.endDate}
              </p>
              <p className="text-sm text-red-500 mt-2">
                ended 
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DonationDrives;
