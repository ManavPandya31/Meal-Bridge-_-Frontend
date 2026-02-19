import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({name: '',contact: '',email: '',education: '',resume: null,});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('contact', formData.contact);
        form.append('email', formData.email);
        form.append('education', formData.education);
        form.append('resume', formData.resume);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_url}/api/join`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            alert(data.message);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#FAEBD7] flex items-center justify-center px-4 py-10 overflow-x-hidden">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-6">
                    Join Our Community
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                            type="text"
                            name="contact"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                        <input
                            type="text"
                            name="education"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF only)</label>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition w-full sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinUs;
