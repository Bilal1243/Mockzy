import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const { mockzyUser } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [logoutUser] = useLogoutUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleBasedLinks = {
    student: [
      { label: "Dashboard", path: "/student/dashboard" },
      { label: "Interviews", path: "/student/interviews" },
      { label: "Feedback", path: "/student/feedback" },
    ],
    faculty: [
      { label: "Dashboard", path: "/faculty/dashboard" },
      { label: "Questions", path: "/faculty/questions" },
      { label: "Reports", path: "/faculty/reports" },
    ],
    organization: [
      { label: "Dashboard", path: "/" },
      { label: "Users", path: "/organization/manage-users" },
      { label: "Mock Interviews", path: "/organization/mockinterviews" },
    ],
  };

  const linksToShow = mockzyUser?.role ? roleBasedLinks[mockzyUser.role] : [];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 w-full z-50 p-3">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-black tracking-tight"
        >
          Mockzy
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {linksToShow.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-black font-medium hover:text-neutral-500 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Logout button */}
          {mockzyUser && (
            <button
              onClick={handleLogout}
              className="text-white bg-black px-3 py-2 rounded-2xl cursor-pointer font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-6 py-4 space-y-2">
          {linksToShow.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-black font-medium hover:text-neutral-500 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Logout option in mobile menu */}
          {mockzyUser && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block text-black font-medium hover:text-neutral-500 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
