import React from "react";
import Story from "./Story";

export default function OurWork() {
  
  return (
    <>
      <section className="bg-[#FAEBD7] py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* Our Work Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our Work</h2>
            <p className="text-gray-700 mt-4">
              At <span className="font-semibold">MealBridge</span>, we are on a mission to reduce food waste and help those in need by connecting surplus food from hotels, restaurants, events, hostels, and PGs with NGOs and volunteers. Our platform ensures that good food reaches the hungry instead of going to waste.
            </p>
          </div>

          {/* How It Works - Left | Image - Right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Food Providers Register:</strong> Hotels, restaurants, and event organizers list surplus food.</li>
                <li><strong>NGOs & Volunteers Connect:</strong> Local NGOs and volunteers find food and arrange pickups.</li>
                <li><strong>Food Reaches the Needy:</strong> NGOs distribute meals to the homeless and underprivileged.</li>
                <li><strong>Real-Time Tracking:</strong> Users can track donations and impact.</li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/foodpickup.jpg" alt="Food Pickup" className="w-80 h-80 rounded-lg" />
            </div>
          </div>

          {/* Image - Left | Our Impact - Right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mt-10">
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/fooddistribution.jpg" alt="Food Distribution" className="w-80 h-80 rounded-lg" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Impact</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Reducing Food Waste:</strong> Saving surplus food from landfills.</li>
                <li><strong>Helping Communities:</strong> Providing meals to those in need.</li>
                <li><strong>Creating Awareness:</strong> Encouraging businesses to contribute to social good.</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">Join us in making a difference—because every meal matters!</p>
            </div>
          </div>

        </div>
      </section>

      <Story />
    </>
  );
}
