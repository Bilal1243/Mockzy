import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <h1 className="text-9xl font-extrabold text-black tracking-tight">404</h1>
      <p className="text-2xl mt-4 font-semibold text-gray-800">
        Page Not Found
      </p>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
