import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DriveDetails = () => {
    const { driveId } = useParams(); // Extract driveId from URL params
    const [drive, setDrive] = useState(null); // State to store drive details
    const [error, setError] = useState(null); // State to handle errors
    const [amount, setAmount] = useState(""); // Input field state
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch drive details from the backend
        const fetchDriveDetails = async () => {
            try {
                //hello
                const response = await axios.get(`https://charityloop.up.railway.app/donationdrive/${driveId}`);
                setDrive(response.data);
            } catch (err) {
                setError("Failed to fetch drive details. Please try again.");
                console.error(err);
            }
        };
        fetchDriveDetails();
    }, [driveId]);

    const handleAddMoney = async () => {
        // Validate the amount before making the request
        console.log(amount);
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        try {
            // Send a PATCH request to add money to the donation drive
            const response = await axios.patch(
                `https://charityloop.up.railway.app/donationdrive/${driveId}/${amount}`, 
                null // Explicitly passing null as the request body
            );
    
            // Handle success message
            setSuccessMessage(response.data);
            setError(null);
    
            // Fetch updated drive details to reflect changes 
            //hello
            //hello
            const updatedDrive = await axios.get(`https://charityloop.up.railway.app/donationdrive/${driveId}`);
            setDrive(updatedDrive.data);
            console.log(updatedDrive.data);
        } catch (err) {
            // Handle errors and show a message
            setError("Failed to add money. Please try again.");
            console.error(err);
        }
    };
    
    

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    if (!drive) {
        return <div className="text-gray-500 text-center mt-4">Loading drive details...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                {/* Image at the top */}
                {drive.image ? (
                    <img
                    //hello
                        src={`https://charityloop.up.railway.app/donationdrive/${driveId}/image`}
                        alt={drive.name}
                        className="w-full h-64 object-cover rounded-md mb-6"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-md mb-6 flex items-center justify-center">
                        <p className="text-gray-500">No Image Available</p>
                    </div>
                )}

                {/* Content container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section: Details */}
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{drive.name}</h1>
                        <p className="text-gray-700 mb-4">{drive.description}</p>
                        <p className="text-lg text-gray-800">
                        Total Money Collected:{" "}
                            <span className="text-green-500 font-semibold">
                            ₹{drive.amountCollected ? drive.amountCollected.toFixed(2) : "0"}
                            </span>
                        </p>
                    </div>

                    {/* Right Section: Add Money Form */}
                    <div className="flex flex-col items-start">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            placeholder="Enter amount to donate"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                            onClick={handleAddMoney}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                        >
                            Add Money
                        </button>
                        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriveDetails;
