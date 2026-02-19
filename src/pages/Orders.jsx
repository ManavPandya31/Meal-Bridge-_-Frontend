import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  
  const [donations, setDonations] = useState([]);
  const ngoName = "Helping Hands";
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchDonations();
    fetchHistory();
  }, []);


  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_url}/api/Doner/available`);
      console.log("Donor Avalable api response",res);
      setDonations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_url}/api/Doner/history/${ngoName}`);
      console.log("History Log :- ",res);

      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };


  const acceptOrder = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_url}/api/Doner/accept/${id}`, { ngoName });
      console.log("Accepect Orders API :- ",res);
      
      fetchDonations();
      fetchHistory();

    } catch (err) {
      alert(err.response?.data?.message || "Error accepting order");
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen bg-[#FAEBD7] p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Available Food Donations
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donations.slice().reverse().map((donation) => (

            <div
              key={donation._id}
              className="p-4 border rounded-lg shadow bg-white flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-700"><strong>Donor:</strong> {donation.donorName}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {donation.phone}</p>
                <p className="text-gray-700"><strong>Location:</strong> {donation.address}</p>
                {donation.addressLink && (
                  <a
                    href={donation.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View on Map
                  </a>
                )}

                <div className="mt-3">
                  <strong className="block mb-2 text-gray-800">Food Details:</strong>
                  {Array.isArray(donation.foodDetails) && donation.foodDetails.map((food, idx) => (

                    <div
                      key={idx}
                      className="mb-3 border rounded p-2 bg-gray-50 text-sm"
                    >
                      <p><strong>Type:</strong> {food.foodType}</p>
                      <p><strong>Serves:</strong> {food.people} people</p>
                      {food.image && (
                        <img
                          src={`${import.meta.env.VITE_API_url}/uploads/${food.image}`}
                          alt="Food"
                          className="w-full h-40 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => acceptOrder(donation._id)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Accept
              </button>
            </div>
          ))}

          {donations.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No donations available at the moment.
            </p>
          )}
        </div>



        <h2 className="text-3xl font-bold mb-6 py-5 text-center text-gray-800 ">Accepted Orders</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {history.slice().reverse().map((donation) => (
            <div key={donation._id} className="p-4 border rounded-lg shadow bg-green-50">
              <p className="text-gray-700"><strong>Donor:</strong> {donation.donorName}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {donation.phone}</p>
              <p className="text-gray-700"><strong>Location:</strong> {donation.address}</p>
              {donation.addressLink && (
                <a
                  href={donation.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View on Map
                </a>
              )}

              <div className="mt-2">
                <strong className="block text-gray-800">Accepted Food:</strong>
                {Array.isArray(donation.foodDetails) && donation.foodDetails.map((food, idx) => (

                  <div key={idx} className="text-sm bg-gray-100 p-2 rounded mt-1">
                    <p><strong>Type:</strong> {food.foodType}</p>
                    <p><strong>Serves:</strong> {food.people}</p>
                    {food.image && (
                      <img
                        src={`${import.meta.env.VITE_API_url}/uploads/${food.image}`}
                        alt="Food"
                        className="w-full h-40 object-cover rounded mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">No accepted orders yet.</p>
          )}
        </div>

      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
          <div className="text-white text-lg font-semibold">Loading...</div>
        </div>
      )}

    </div>

  );
};

export default Orders;

