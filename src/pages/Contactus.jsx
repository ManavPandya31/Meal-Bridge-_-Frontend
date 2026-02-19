import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: '',email: '',message: '',});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_url}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseMessage(data.message);

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          navigate('/');
        }, 1);
      }
    } catch (error) {
      console.error(error);
      setResponseMessage('Something went wrong. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <section className="bg-[#FAEBD7] py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          Have questions or want to get involved? Reach out to us—we’d love to hear from you!
        </p>

        {/* Contact Details */}
        <div className="bg-[#fdf5ee] p-6 rounded-lg shadow-md mb-6">
          <p className="text-gray-800">
            <strong>📍 Address:</strong> 306, Suryansh Gateway, Science City Rd, near Sal Institute Of Technology & Engineering Research, Ahmedabad, Gujarat 380060
          </p>
          <p className="text-gray-800 mt-2">
            <strong>📧 Email:</strong>{' '}
            <a href="mailto:mealbridge@gmail.com" className="text-blue-600 hover:underline">
                support@mealbridge.com            </a>
          </p>
          <p className="text-gray-800 mt-2">
            <strong>📞 Phone:</strong>{' '}
            <a href="tel:+919157241412" className="text-blue-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
          <p className="text-gray-800 mt-2">
            <strong>🌐 Website:</strong>{' '}
            <a
              href="https://www.mealbridge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.mealbridge.com
            </a>
          </p>
        </div>

        {/* Contact Form */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-[#fdf5ee] p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              rows="4"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition w-full sm:w-auto"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {responseMessage && (
            <p className="">{responseMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
