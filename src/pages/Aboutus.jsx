import React from 'react';
import { Link } from 'react-router-dom';

const User = JSON.parse(localStorage.getItem("User"));

export default function AboutUs() {
  
  return (
    <section className="bg-[#FAEBD7] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>

        {/* Introduction */}
        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">MealBridge</span>, we are dedicated to bridging the gap between food surplus and hunger. Our platform connects food providers—hotels, restaurants, events, hostels, and PGs—with NGOs and volunteers to ensure excess food reaches those in need.
        </p>

        {/* Vision & Mission */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision & Mission</h3>
        <p className="text-gray-700 mb-6">
          We envision a world where surplus food is no longer wasted but shared with those who need it most. Our mission is to create an easy-to-use platform where food donors and NGOs can collaborate to make a meaningful impact.
        </p>

        {/* How We Work */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">How We Work</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li><strong>Food Providers List Excess Food:</strong> Hotels, restaurants, and event organizers register surplus food.</li>
          <li><strong>NGOs & Volunteers Pick It Up:</strong> Local NGOs and volunteers arrange pickups.</li>
          <li><strong>Food Reaches the Needy:</strong> Meals are distributed to the homeless and underprivileged.</li>
        </ul>

        {/* Impact */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Impact</h3>
        <p className="text-gray-700 mb-6">
          Since our inception, we have distributed over <span className="font-semibold">50,000 meals</span>, partnered with <span className="font-semibold">100+ NGOs</span>, and helped <span className="font-semibold">thousands of individuals</span> in need.
        </p>

        {/* Call to Action */}
        {User?.role !== "admin" && (
          <div className="bg-[#fdf5ee] p-6 rounded-lg shadow-md text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Us</h3>
            <p className="text-gray-700 mb-4">
              Be a part of the movement! Whether you’re a restaurant, hotel, or volunteer, you can help reduce food waste and support communities in need.
            </p>
            <Link to="/join-us">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
                Get Involved
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
