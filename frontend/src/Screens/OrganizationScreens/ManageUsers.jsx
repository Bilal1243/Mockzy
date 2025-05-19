import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../slices/organizationApiSlice";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Faculty",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Alex Brown",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
  },
];

const ManageUsers = () => {
  const { mockzyUser } = useSelector((state) => state.auth);

  const { data: users, isLoading } = useGetAllUsersQuery({
    organization: mockzyUser?.userId,
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          <Link
            to="/organization/add-user"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add User
          </Link>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-700 border-b">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="text-sm text-gray-800 border-t">
                  <td className="py-3 px-4">{user?.userDetails?.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {dummyUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
