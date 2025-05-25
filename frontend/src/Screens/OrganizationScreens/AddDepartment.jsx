import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useAddDepartmentMutation,
  useGetAllDepartmentsQuery,
} from "../../slices/departmentApiSlice";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const { mockzyUser } = useSelector((state) => state.auth);

  const [name, setName] = useState("");

  const { refetch } = useGetAllDepartmentsQuery({
    organization: mockzyUser?.userId,
  });

  const [addDepartment] = useAddDepartmentMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment({
        name,
        organization: mockzyUser.userId,
        createdBy: mockzyUser._id,
      }).unwrap();
      toast.success("Added Successfully!");
      refetch()
      navigate('/organization/manage-departments')
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add Department
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Department Name */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="departmentName"
            >
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Data Science"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
