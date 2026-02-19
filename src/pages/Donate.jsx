import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DonateFood() {

  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([{ type: "", quantity: "", image: null }]);
  const [locationLink, setLocationLink] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [formData, setFormData] = useState({ donorName: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (!user) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {
      const { donorName, phone } = formData;

      if (!manualAddress && !locationLink) {
        alert("Please provide an address or allow location access.");
        return;
      }

      const submissionData = new FormData();
      submissionData.append("donorName", donorName);
      submissionData.append("phone", phone);
      submissionData.append("address", manualAddress || "");
      submissionData.append("addressLink", locationLink || "");


      const foodDetailsData = foodItems.map((item) => ({
        foodType: item.foodType,
        people: parseInt(item.people),
      }));

      submissionData.append("foodDetails", JSON.stringify(foodDetailsData));


      foodItems.forEach((item) => {
        if (item.image) {
          submissionData.append("foodImages", item.image);
        }
      });


      const res = await axios.post(`${import.meta.env.VITE_API_url}/api/Doner/addFoodDonate`, submissionData);
      //console.log(res)

      if (res.data.status === "success") {
        alert("Donation successful!");
        setFormData({ donorName: "", phone: "" });
        setFoodItems([{ type: "", quantity: "", image: "" }]);
        setManualAddress("");
        setLocationLink("");
        navigate("/");

      } else {
        alert(res.data.message || "Something went wrong.");
      }

    } catch (error) {
      console.error("Donation Data Error:", error);
      alert("Error while sending Donation, please try again.");

    } finally {
      setLoading(false);
    }
  };

  const addFoodItem = () => {
    setFoodItems([...foodItems, { foodType: "", people: "", image: "" }]);
  };

  const handleFoodChange = (index, field, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index][field] = value;
    setFoodItems(updatedItems);
  };

  const handleFileChange = (index, file) => {
    const updatedItems = [...foodItems];
    updatedItems[index].image = file;
    setFoodItems(updatedItems);
  };

  const removeFoodItem = (index) => {
    const updatedItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(updatedItems);
  };

  function getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setLocationLink(mapsLink);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then((result) => {
                if (result.state === "denied") {
                  alert(
                    "Location access is blocked. Please allow it in your browser settings."
                  );
                }
              });
          } else {
            alert("Unable to fetch location. Please try again.");
          }
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const clearLocation = () => {
    setLocationLink("");
  };

  return (
    <section className="w-full bg-[#FAEBD7] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Donate Food</h2>
        <p className="text-gray-700 text-center mb-8">
          Join <span className="font-semibold">MealBridge</span> in our mission to reduce food waste and provide meals to those in need.
          Register as a food donor and make a difference today!
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Information</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name of Donor / Organization</label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your name or business name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Contact Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Current Address (Required)</label>
              <input
                type="text"
                name="address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter full address"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                required={!locationLink}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Use My Current Location (Optional)</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={getLocation}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
                >
                  Use My Current Location
                </button>
                {locationLink && (
                  <button
                    type="button"
                    onClick={clearLocation}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
                  >
                    Clear Location
                  </button>
                )}
              </div>
              {locationLink && (
                <p className="mt-2 text-blue-600 underline break-all">
                  <a href={locationLink} target="_blank" rel="noopener noreferrer">
                    {locationLink}
                  </a>
                </p>
              )}
            </div>

            {foodItems.map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md mt-6 relative">
                {foodItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFoodItem(index)}
                    className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Type of Food</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="E.g. Cooked meals, Bakery items"
                      value={foodItems[index]?.foodType || ""}
                      onChange={(e) => handleFoodChange(index, "foodType", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Enough for how many people?</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Enter estimated number of people"
                      value={foodItems[index]?.people || ""}
                      onChange={(e) => handleFoodChange(index, "people", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Upload Food Image</label>
                    <div className="flex gap-4 items-center">
                      <input
                        id={`fileInput-${index}`}
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById(`cameraInput-${index}`).click()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
                      >
                        Open Camera
                      </button>
                      <input
                        id={`cameraInput-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        capture="environment"
                        className="hidden"
                      />
                    </div>
                    {foodItems[index]?.image && (
                      <img
                        src={URL.createObjectURL(foodItems[index].image)}
                        alt="Selected Food"
                        className="mt-4 h-24 w-24 object-cover rounded-lg border border-gray-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={addFoodItem}
                className="w-full sm:w-1/2 text-gray-800 bg-white border border-gray-400 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Add Food Item +
              </button>

              <button
                type="submit"
                className="w-full sm:w-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
                onClick={handleSubmit}
              >
                Donate Food
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
          <div className="text-white text-lg font-semibold">Submitting your donation...</div>
        </div>
      )}

    </section>
  );
}
