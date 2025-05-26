import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "../../slices/organizationApiSlice";
import { toast, Toaster } from "react-hot-toast";
import {
  useGetAllDepartmentsQuery,
  useLazyGetFacultiesByDepartmentQuery,
} from "../../slices/departmentApiSlice";

const AddUserScreen = () => {
  const { mockzyUser } = useSelector((state) => state.auth);

  const { refetch } = useGetAllUsersQuery({ organization: mockzyUser?.userId });

  const [triggerGetFaculties, { data: faculties }] =
    useLazyGetFacultiesByDepartmentQuery();

  const {
    data: departments = [],
    isLoading,
    refetch: refetchDepartments,
  } = useGetAllDepartmentsQuery({
    organization: mockzyUser?.userId,
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    faculty: null,
  });

  const roles = ["student", "faculty"];

  const [createUser] = useCreateUserMutation();

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" ? { faculty: "" } : {}),
    }));

    // If role is student and department is selected, fetch faculties
    if (
      (name === "department" && formData.role === "student") ||
      (name === "role" && value === "student" && formData.department)
    ) {
      const deptId = name === "department" ? value : formData.department;
      triggerGetFaculties({
        departmentId: deptId,
        organization: mockzyUser?.userId,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      organization: mockzyUser.userId,
    };

    if (formData.role !== "student") {
      delete payload.faculty;
    }

    try {
      toast.promise(createUser(payload).unwrap(), {
        loading: "Creating new user...",
        success: () => {
          setTimeout(() => {
            refetch();
            refetchDepartments();
            navigate("/organization/manage-users");
          }, 1500);
          return "New user created successfully!";
        },
        error: (err) => err?.data?.message || "Failed to create user.",
      });
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

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black"
            >
              <option value="">Select a Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Faculty Dropdown (only for students) */}
          {formData.role === "student" &&
            formData.department &&
            faculties?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Faculty
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black"
                >
                  <option value="">Select a Faculty</option>
                  {faculties.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>
                      {faculty?.facultyDetails?.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

          {/* Info */}
          <p>
            Default password will be{" "}
            <span className="text-amber-600">{mockzyUser.name}</span>
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
