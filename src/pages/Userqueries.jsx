import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const UserQueries = () => {

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_url}/api/query/query`);
        
        setQueries(res.data);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching queries:", err);
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id, email) => {
    const message = replyText[id];
  
    if (!message) return alert("Reply message cannot be empty.");
  
    setEmailLoading(true);
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_url}/api/query/reply`, {
        id,
        message,
      });
  
      if (res.status === 200) {
        alert(`✅ Reply sent to ${email}`);
  
        // Clear reply text
        setReplyText((prev) => ({ ...prev, [id]: "" }));
  
        // Delete query from DB
        await axios.delete(`${import.meta.env.VITE_API_url}/api/query/delete/${id}`);
  
        // Update UI after deletion
        setQueries((prev) => prev.filter((q) => q._id !== id));
      } else {
        alert("❌ Failed to send reply.");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("❌ Something went wrong.");
    } finally {
      setEmailLoading(false);
    }
  };
  
  return (

    <div className="min-h-screen bg-[#FAEBD7] p-6 flex justify-center">
      {emailLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
          <div className="text-white text-lg font-semibold">Sending reply...</div>
        </div>
      )}
      <div className="w-full md:w-[70%]">
        <h2 className="text-3xl font-bold mb-6">User Queries</h2>

        {loading ? (
          <p>Loading queries...</p>
        ) : queries.length === 0 ? (
          <p>No queries found.</p>
        ) : (
          <div className="grid gap-6">
            {queries.map((query) => (
              <div
                key={query._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
              >

                <p>
                  <span className="font-semibold">Name:</span> {query.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {query.email}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Message:</span> {query.message}
                </p>

                <textarea
                  rows={3}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-orange-200 mb-4"
                  placeholder="Type your reply here..."
                  value={replyText[query._id] || ""}
                  onChange={(e) => handleReplyChange(query._id, e.target.value)}
                />

                <button
                  onClick={() => sendReply(query._id, query.email)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition"
                >
                  Send Reply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQueries;
