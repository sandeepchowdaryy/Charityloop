import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DonationForm = () => {
  const donorId = useSelector((store) => store?.details?.userDetails?.id || null);
  
  const [donationItem, setDonationItem] = useState({
    name: "",
    quantity: "",
    dsc: "",
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationItem({ ...donationItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append the donation item entity
    formData.append(
      "donationItemEntity",
      new Blob([JSON.stringify(donationItem)], { type: "application/json" })
    );

    // Append the image if available
    if (image) {
      formData.append("image", image);
    }

    // Append the donor ID
    if (donorId) {
      formData.append("donorId", donorId);
    }

    try {
        //hello
      const response = await axios.post(
        "https://charityloop.up.railway.app",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Donation item created successfully");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating donation item:", error.response?.data || error);
      alert("Failed to create donation item");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Donation Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={donationItem.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={donationItem.quantity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="dsc"
            value={donationItem.dsc}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            rows="4"
            placeholder="Add a brief description of the donation item"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
