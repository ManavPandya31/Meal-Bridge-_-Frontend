import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Logo and Info */}
        <div className="flex flex-col items-center md:items-start space-y-2 w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="MealBridge Logo" className="h-12" />
            <span className="text-xl font-bold">MealBridge</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-4 md:space-x-6 text-sm w-full md:w-auto">
  <Link to="/" className="hover:text-green-400 no-underline">Home</Link>
  <Link to="/about-us" className="hover:text-green-400 no-underline">About Us</Link>
  <Link to="/login" className="hover:text-green-400 no-underline">Login</Link>
  <Link to="/signup" className="hover:text-green-400 no-underline">Sign Up</Link>
</nav>


        {/* Social Media Links */}
        <div className="mt-4 md:mt-0 flex space-x-4 w-full md:w-auto justify-center md:justify-start">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-green-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-green-400" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-green-400" />
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 text-center text-sm text-gray-400 w-full">
        <p>Email: support@mealbridge.com | Phone: +91 98765 43210</p>
        <p>&copy; {new Date().getFullYear()} MealBridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;