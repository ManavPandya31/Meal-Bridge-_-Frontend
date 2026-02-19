import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Jobapplications = () => {

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_url}/api/join`);
            setSubmissions(res.data.reverse());
            setLoading(false);

        } catch (error) {
            console.error("Failed to fetch join us data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#fff7f0] p-4 md:p-8 overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 text-center break-words">
                Job Applications
            </h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : submissions.length === 0 ? (
                <p className="text-center text-gray-500">No submissions yet.</p>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto w-full">
                        <table className="w-full text-sm md:text-base table-auto border border-gray-300 rounded-md bg-white">
                            <thead className="bg-orange-100 text-gray-800">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Education</th>
                                    <th className="p-3 text-left">Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((entry) => (
                                    <tr key={entry._id} className="border-t hover:bg-orange-50">
                                        <td className="p-3 break-words">{entry.name}</td>
                                        <td className="p-3 break-words max-w-xs">{entry.email}</td>
                                        <td className="p-3 break-words">{entry.contact}</td>
                                        <td className="p-3 break-words">{entry.education}</td>
                                        <td className="p-3">
                                            {entry.resumePath ? (
                                                <a
                                                    href={`/${entry.resumePath.replace(/\\/g, '/')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition no-underline text-sm md:text-base block w-fit text-center"
                                                >
                                                    Download
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 italic">No resume</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block md:hidden space-y-4">
                        {submissions.map((entry) => (
                            <div
                                key={entry._id}
                                className="bg-white p-4 rounded-lg shadow border border-orange-100 break-words w-full"
                            >
                                <h2 className="text-lg font-semibold text-orange-600 mb-2 break-words">
                                    {entry.name}
                                </h2>
                                <p className="text-sm break-words">
                                    <span className="font-medium">Email:</span> {entry.email}
                                </p>
                                <p className="text-sm break-words">
                                    <span className="font-medium">Phone:</span> {entry.contact}
                                </p>
                                <p className="text-sm break-words">
                                    <span className="font-medium">Education:</span> {entry.education}
                                </p>
                                <div className="mt-3">
                                    {entry.resumePath ? (
                                        <a
                                            href={`${import.meta.env.VITE_API_url}/${entry.resumePath.replace(/\\/g, '/')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            
                                            className="bg-orange-500 no-underline text-white w-full text-center block py-2 rounded-md hover:bg-orange-600 transition text-sm break-all"
                                        >
                                            Download Resume
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 italic">No resume</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Jobapplications;
