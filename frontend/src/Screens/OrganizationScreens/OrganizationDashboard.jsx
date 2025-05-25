import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const { mockzyUser } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-1">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center mt-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to {mockzyUser.name} Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your organization’s members, insights, and operations in one
            place.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Manage Members */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/861/861117.png"
              alt="Manage Members"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Manage Members
            </h3>
            <p className="text-gray-500 text-center">
              Add, edit, or remove organization members easily.
            </p>
            <Link
              to="/organization/manage-users"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Manage Now
            </Link>
          </div>

          {/* Insights */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1132/1132614.png"
              alt="Insights"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Organization Insights
            </h3>
            <p className="text-gray-500 text-center">
              Analyze member engagement and activity trends.
            </p>
            <Link
              to="/organization/insights"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Insights
            </Link>
          </div>

          {/* Reports */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2838/2838996.png"
              alt="Reports"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Reports
            </h3>
            <p className="text-gray-500 text-center">
              Generate reports for performance, activities, and trends.
            </p>
            <Link
              to="/organization/reports"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Generate Reports
            </Link>
          </div>

          {/* Add Departments */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126486.png"
              alt="Add Departments"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Manage Departments
            </h3>
            <p className="text-gray-500 text-center">
              Create and manage organizational departments.
            </p>
            <Link
              to="/organization/manage-departments"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Manage Departments
            </Link>
          </div>

          {/* Add Mock Interviews */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1239/1239127.png"
              alt="Add Mock Interviews"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Manage Mock Interviews
            </h3>
            <p className="text-gray-500 text-center">
              Schedule and organize mock interview sessions.
            </p>
            <Link
              to="/organization/add-mock-interviews"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Schedule Now
            </Link>
          </div>

          {/* Add Announcements */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633759.png"
              alt="Add Announcements"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add Announcements
            </h3>
            <p className="text-gray-500 text-center">
              Create announcements to notify organization members.
            </p>
            <Link
              to="/organization/add-announcements"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Announce Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
