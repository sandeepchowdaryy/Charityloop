import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [donors, setDonors] = useState([]);
  const [logistics, setLogistics] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [donationDrives, setDonationDrives] = useState([]);
  const { userDetails } = useSelector((store) => store.details);

  const [loading, setLoading] = useState(true);
  

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donors, logistics, recipients, drives] = await Promise.all([
          axios.get("https://charityloop.up.railway.app/donor").then(res => res.data),
          axios.get("https://charityloop.up.railway.app/logisticsController").then(res => res.data),
          axios.get("https://charityloop.up.railway.app/recipient").then(res => res.data),
          axios.get("https://charityloop.up.railway.app/donationdrive").then(res => res.data),
        ]);
  
        setDonors(donors);
        setLogistics(logistics);
        setRecipients(recipients);
        setDonationDrives(drives);
      } catch (error) {
        toast.error("Failed to fetch data.");
      }
    };
  
    fetchData();
  }, []);

  // hello
  

  const handleDriveAction = async (driveId, action) => {
    try {
      await axios.put(`https://charityloop.up.railway.app/admin/1/donationdrives/${driveId}/${action}`);
      if (action === "accept") {
        toast.success("Donation drive accepted successfully!");
        setDonationDrives((prevDrives) =>
          prevDrives.map((drive) =>
            drive.id === driveId ? { ...drive, status: "accepted" } : drive
          )
        );
      } else if (action === "reject" || action === "remove") {
        toast.success(
          action === "reject"
            ? "Donation drive rejected successfully!"
            : "Donation drive removed successfully!"
        );
        setDonationDrives((prevDrives) =>
          prevDrives.filter((drive) => drive.id !== driveId)
        );
      }
    } catch (error) {
      console.error("Error performing drive action:", error);
      toast.error(`Failed to ${action} donation drive.`);
    }
  };

  const handleAction = async (itemId, formRole, action) => {
    const { id, role } = userDetails;

    try {
      await axios.put(`https://charityloop.up.railway.app/${role}/${id}/${formRole}/${itemId}/${action}`);

      if (formRole === "coordinators") {
        if (action === "accept") {
          toast.success("Coordinator accepted successfully!");
          setLogistics((prevLogistics) =>
            prevLogistics.map((coordinator) =>
              coordinator.id === itemId ? { ...coordinator, status: "accepted" } : coordinator
            )
          );
        } else if (action === "reject") {
          toast.success("Coordinator rejected successfully!");
          setLogistics((prevLogistics) =>
            prevLogistics.filter((coordinator) => coordinator.id !== itemId)
          );
        }
      }

      if (formRole === "recipients") {
        if (action === "accept") {
          toast.success("Recipient accepted successfully!");
          setRecipients((prevRecipients) =>
            prevRecipients.map((recipient) =>
              recipient.id === itemId ? { ...recipient, status: "accepted" } : recipient
            )
          );
        } else if (action === "reject") {
          toast.success("Recipient rejected successfully!");
          setRecipients((prevRecipients) =>
            prevRecipients.filter((recipient) => recipient.id !== itemId)
          );
        }
      }
    } catch (error) {
      console.error("Error performing action:", error);
      toast.error(`Failed to ${action} ${formRole.slice(0, -1)}.`);
    }
  };


  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        toastClassName="text-sm"
      />
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Pending Donation Drives */}
      {donationDrives.filter((drive) => drive.status === "pending").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending Donation Drives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donationDrives
              .filter((drive) => drive.status === "pending")
              .map((drive) => (
                <Link to={"/donationdrive/"+drive.id}>
                <div
                  key={drive.id}
                  className="border border-gray-300 p-4 rounded-lg shadow-md"
                >
                  <img
              //hello
                src={`https://charityloop.up.railway.app/donationdrive/${drive.id}/image`}
                alt={drive.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
                  <h3 className="font-bold text-lg">{drive.name}</h3>
                  <p>{drive.description}</p>
                  <p>Start Date: {drive.startDate}</p>
                  <p>End Date: {drive.endDate}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleDriveAction(drive.id, "accept")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDriveAction(drive.id, "reject")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Accepted Donation Drives */}
      {donationDrives.filter((drive) => drive.status === "accepted").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Accepted Donation Drives</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {donationDrives
                .filter((drive) => drive.status === "accepted")
                .map((drive) => (
                  <tr key={drive.id}>
                    <td className="border border-gray-300 px-4 py-2">{drive.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{drive.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{drive.description}</td>
                    <td className="border border-gray-300 px-4 py-2">{drive.startDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{drive.endDate}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDriveAction(drive.id, "reject")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      
           {/* Donor Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
         <h2 className="text-2xl font-bold mb-4">Donors</h2>
         <table className="table-auto w-full border-collapse border border-gray-300">
           <thead>
             <tr>
               <th className="border border-gray-300 px-4 py-2">ID</th>
               <th className="border border-gray-300 px-4 py-2">Name</th>
               <th className="border border-gray-300 px-4 py-2">Email</th>
               <th className="border border-gray-300 px-4 py-2">Phone</th>
               <th className="border border-gray-300 px-4 py-2">Role</th>
             </tr>
          </thead>
           <tbody>
             {donors.map((donor) => (
               <tr key={donor.id}>
                 <td className="border border-gray-300 px-4 py-2">{donor.id}</td>
                 <td className="border border-gray-300 px-4 py-2">{donor.name}</td>
                 <td className="border border-gray-300 px-4 py-2">{donor.email}</td>
                <td className="border border-gray-300 px-4 py-2">{donor.phone}</td>
                 <td className="border border-gray-300 px-4 py-2">{donor.role}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
      {/* Pending Logistics Coordinators */}
      {logistics.filter((coordinator) => coordinator.status === "pending").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending Logistics Coordinators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logistics.filter((coordinator) => coordinator.status === "pending").map((coordinator) => (
              <div
                key={coordinator.id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <h3 className="font-bold text-lg">{coordinator.name}</h3>
                <p>Email: {coordinator.email}</p>
                <p>Phone: {coordinator.phone}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      handleAction(coordinator.id, "coordinators", "accept")
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleAction(coordinator.id, "coordinators", "reject")
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accepted Logistics Coordinators */}
      {logistics.filter((coordinator) => coordinator.status === "accepted").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Accepted Logistics Coordinators</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {logistics
                .filter((coordinator) => coordinator.status === "accepted")
                .map((coordinator) => (
                  <tr key={coordinator.id}>
                    <td className="border border-gray-300 px-4 py-2">{coordinator.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{coordinator.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{coordinator.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{coordinator.phone}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleAction(coordinator.id, "coordinators", "reject")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pending Recipients */}
      {recipients.filter((recipient) => recipient.status === "pending").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending Recipients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipients.filter((recipient) => recipient.status === "pending").map((recipient) => (
              <div
                key={recipient.id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <h3 className="font-bold text-lg">{recipient.name}</h3>
                <p>Email: {recipient.email}</p>
                <p>Phone: {recipient.phone}</p>
                <p>Status: {recipient.status}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      handleAction(recipient.id, "recipients", "accept")
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleAction(recipient.id, "recipients", "reject")
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accepted Recipients */}
      {recipients.filter((recipient) => recipient.status === "accepted").length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Accepted Recipients</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recipients
                .filter((recipient) => recipient.status === "accepted")
                .map((recipient) => (
                  <tr key={recipient.id}>
                    <td className="border border-gray-300 px-4 py-2">{recipient.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{recipient.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{recipient.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{recipient.phone}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleAction(recipient.id, "recipients", "reject")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
