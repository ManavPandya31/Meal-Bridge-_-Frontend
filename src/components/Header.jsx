import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  let User = localStorage.getItem("User");
  User = JSON.parse(User);
  console.log("user", User);
  const links =
    User && User.role === "admin"
      ? [
          { path: "/", label: "Home" },
          { path: "/Jobapplications", label: "Job Applications" },
          { path: "/userqueries", label: "User Queries" },
          { path: "/about-us", label: "About Us" },
        ]
      : [
          { path: "/", label: "Home" },
          { path: "/our-work", label: "Our Work" },
          { path: "/about-us", label: "About Us" },
          { path: "/contact-us", label: "Contact Us" },
        ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-600 font-bold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <header className="bg-white shadow-md relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4 flex-wrap w-full">
        {/* Logo */}
        <div to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="MealBridge Logo"
            className="h-11 w-11 mr-3"
          />
          <span className="text-2xl md:text-3xl font-bold text-orange-500">
            MealBridge
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {Array.isArray(links) &&
            links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`cursor-pointer no-underline ${isActive(path)}`}
              >
                {label}
              </Link>
            ))}
        </nav>

        {/* Auth Buttons / User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {User ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 no-underline font-bold hover:text-orange-500"
              >
                {User.name}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden top-full left-0 w-full z-50 flex flex-col space-y-4 bg-white p-4 shadow-md items-center overflow-x-hidden">
          {Array.isArray(links) &&
            links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`cursor-pointer no-underline ${isActive(path)}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

          {User ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 no-underline font-bold hover:text-orange-500"
              >
                {User.name}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 no-underline"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
