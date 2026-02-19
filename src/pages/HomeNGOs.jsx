import React from "react";
import Stats from "./Stats";
import { Link } from "react-router-dom";

const HomeNGOs = () => {

    return (
        <>
            <section
                className="flex flex-col bg-[#FAEBD7] items-center text-center h-screen py-40 px-6 md:py-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/deckstop.png')" }}
            >
                <h1 className="text-3xl md:text-5xl font-bold text-gray-700 mb-4 mt-[10%]">
                    Together, We Can Feed Those in Need.
                </h1>
                <p className="text-lg md:text-2xl text-gray-800 mb-6 max-w-3xl">
                    Join our mission to reduce food wastage and help those in need.
                </p>
                <div className="flex space-x-4">
                    <Link to="/orders">
                        <button className="bg-orange-500 text-white px-12 py-3 rounded-lg hover:bg-orange-600 mt-5">
                            Orders
                        </button>
                    </Link>
                </div>
            </section>
            <Stats />
        </>
    );
};

export default HomeNGOs;
