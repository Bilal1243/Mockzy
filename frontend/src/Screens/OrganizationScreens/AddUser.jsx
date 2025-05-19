import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../slices/organizationApiSlice";
import { toast, Toaster } from "react-hot-toast";

const AddUserScreen = () => {
  const { mockzyUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const roles = ["student", "faculty"];

  const [createUser] = useCreateUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.promise(
        createUser({ ...formData, organization: mockzyUser.userId }).unwrap(),
        {
          loading: "Creating new user...",
          success: () => {
            setTimeout(() => {
              navigate("/organization/manage-users");
            }, 1500);
            return "New user created successfully!";
          },
          error: (err) =>
            err?.data?.message || "Failed to create organization.",
        }
      );
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-3">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="Enter email"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <p>
            Default password will be{" "}
            <span className="text-amber-600"> {mockzyUser.name}</span>
          </p>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserScreen;
