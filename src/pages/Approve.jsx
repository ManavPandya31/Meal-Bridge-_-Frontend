import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NGOApprovalPanel = () => {

    const [unapprovedNgos, setUnapprovedNgos] = useState([]);
    const [approvedNgos, setApprovedNgos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchNgos = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_url}/api/users/get`);

            const allNgos = res.data.filter(user => user.role === "ngo");
            setUnapprovedNgos(allNgos.filter(ngo => !ngo.isApproved));
            setApprovedNgos(allNgos.filter(ngo => ngo.isApproved));
            setLoading(false);

        } catch (err) {
            console.error("Error fetching NGOs", err);
        }
    };

    const approveNgo = async (id) => {

        try {
            setIsProcessing(true);

            const res = await axios.put(`${import.meta.env.VITE_API_url}/api/users/approved/${id}`);
            
            toast.success("✅ NGO Approved");
            fetchNgos();

        } catch (err) {
            console.error("Error approving NGO:", err);
            toast.error("❌ Error approving NGO");

        } finally {
            setIsProcessing(false);
        }
    };

    const disapproveNgo = async (id) => {

        try {
            setIsProcessing(true);
            const res = await axios.put(`${import.meta.env.VITE_API_url}/api/users/unapprove/${id}`);
            
            toast.success("🚫 NGO Disapproved");
            fetchNgos();

        } catch (err) {
            console.error("Error disapproving NGO:", err);
            toast.error("❌ Error disapproving NGO");

        } finally {
            setIsProcessing(false);
        }
    };

    const deleteNgo = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to completely delete this NGO?");
        
        if (!confirmDelete) return;

        try {
            setIsProcessing(true);
            const res = await axios.delete(`${import.meta.env.VITE_API_url}/api/users/remove/${id}`);
           
            toast.success("🗑️ NGO Deleted");
            fetchNgos();

        } catch (err) {
            console.error("Error deleting NGO:", err);
            toast.error("❌ Error deleting NGO");

        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        fetchNgos();
    }, []);

    const renderCard = (ngo, isPending) => (
        <div key={ngo._id} className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
            <div className="font-semibold text-lg text-orange-600">{ngo.name}</div>
            <div className="text-sm text-gray-600 mb-2">{ngo.email}</div>

            <div className="text-sm mb-1"><span className="font-medium">Phone:</span> {ngo.phone}</div>
            <div className="text-sm mb-1"><span className="font-medium">Organization:</span> {ngo.organizationName || "-"}</div>
            <div className="text-sm mb-2"><span className="font-medium">Reg. No.:</span> {ngo.registrationNumber || "-"}</div>

            <div className="flex flex-wrap gap-2 mt-2">
                {isPending ? (
                    <button
                        onClick={() => approveNgo(ngo._id)}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Approve"
                        )}
                    </button>
                ) : (
                    <button
                        onClick={() => disapproveNgo(ngo._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Approve"
                        )}
                    </button>
                )}
                <button
                    onClick={() => deleteNgo(ngo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    disabled={isProcessing}
                >
                    Delete
                </button>
            </div>
        </div>
    );

    const renderRow = (ngo, isPending) => (
        <tr key={ngo._id} className="border-t">
            <td className="p-2 break-words">
                <div className="font-medium">{ngo.name}</div>
                <div className="text-sm text-gray-500">{ngo.email}</div>
                <div className="text-sm text-gray-600">{ngo.phone}</div>
            </td>
            <td className="p-2">
                <div>{ngo.organizationName || "-"}</div>
                <div className="text-sm text-gray-500">{ngo.registrationNumber || "-"}</div>
            </td>
            <td className="p-2 space-x-2">
                {isPending ? (
                    <button
                        onClick={() => approveNgo(ngo._id)}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                        disabled={isProcessing}
                    >
                        Approve
                    </button>
                ) : (
                    <button
                        onClick={() => disapproveNgo(ngo._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        disabled={isProcessing}
                    >
                        Disapprove
                    </button>
                )}
                <button
                    onClick={() => deleteNgo(ngo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={isProcessing}
                >
                    Delete
                </button>
            </td>
        </tr>
    );

    return (
        <div className="bg-[#FAEBD7]">
        <div className="min-h-screen flex flex-col p-4 md:p-6 max-w-6xl mx-auto overflow-x-hidden bg-[#FAEBD7]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-600 text-center">
                NGO Approval Panel
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Pending NGOs */}
                    <section className="mb-8">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">⏳ Pending Approvals</h3>
                        {unapprovedNgos.length === 0 ? (
                            <p className="text-sm text-gray-500">No pending NGO approvals.</p>
                        ) : (
                            <>
                                {/* Mobile Cards */}
                                <div className="md:hidden">
                                    {unapprovedNgos.map(ngo => renderCard(ngo, true))}
                                </div>
                                {/* Desktop Table */}
                                <div className="hidden md:block bg-white overflow-auto">
                                    <table className="w-full border border-gray-300 rounded-md text-sm md:text-base table-auto">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 text-left">Name, Email & Phone</th>
                                                <th className="p-2 text-left">Organization & Reg. No.</th>
                                                <th className="p-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {unapprovedNgos.map(ngo => renderRow(ngo, true))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </section>

                    {/* Approved NGOs */}
                    <section>
                        <h3 className="text-xl font-semibold mb-2  text-gray-700">✅ Approved NGOs</h3>
                        {approvedNgos.length === 0 ? (
                            <p className="text-sm text-gray-500">No NGOs have been approved yet.</p>
                        ) : (
                            <>
                                {/* Mobile Cards */}
                                <div className="md:hidden">
                                    {approvedNgos.map(ngo => renderCard(ngo, false))}
                                </div>
                                {/* Desktop Table */}
                                <div className="hidden md:block bg-white overflow-auto">
                                    <table className="w-full border border-gray-300 rounded-md text-sm md:text-base table-auto">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 text-left">Name, Email & Phone</th>
                                                <th className="p-2 text-left">Organization & Reg. No.</th>
                                                <th className="p-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {approvedNgos.map(ngo => renderRow(ngo, false))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </section>
                </>
            )}
            <ToastContainer position="top-right" autoClose={3000} />

        </div>
        </div>
    );
};

export default NGOApprovalPanel;
