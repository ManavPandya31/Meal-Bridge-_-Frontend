import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/Aboutus";
import OurWork from "./pages/Ourwork";
import ContactUs from "./pages/Contactus";
import DonateFood from "./pages/Donate";
import Orders from "./pages/Orders";
import JoinUs from "./pages/Joinus";
import NGOApprovalPanel from "./pages/Approve";
import Jobapplications from "./pages/Jobapplications";
import UserQueries from "./pages/Userqueries";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate-food" element={<DonateFood />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/NGO-approve" element={<NGOApprovalPanel />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Jobapplications" element={<Jobapplications />} />
        <Route path="/userqueries" element={<UserQueries />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
