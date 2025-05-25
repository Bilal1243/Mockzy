import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllDepartmentsQuery } from "../../slices/departmentApiSlice";
import { exportToExcel } from "../../utils/exportToExcel";

const ManageDepartments = () => {
  const { mockzyUser } = useSelector((state) => state.auth);
  const { data: departments, isLoading } = useGetAllDepartmentsQuery({
    organization: mockzyUser?.userId,
  });

  const handleDownload = () => {
    const columnMap = {
      name: "Department Name",
      facultiesCount: "Total Faculties",
      studentsCount: "Total Students",
      membersCount: "Total Members",
      headName: "Head",
    };

    const formattedData = departments.map((dept) => ({
      name: dept.name,
      facultiesCount: dept?.facultiesCount || 0,
      studentsCount: dept?.studentsCount || 0,
      membersCount: dept.members?.length || 0,
      headName: dept.head?.name || "N/A",
    }));

    exportToExcel(formattedData, "departments", columnMap);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Departments
          </h2>
          <div className="flex gap-4">
            <Link
              to="/organization/add-department"
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add Department
            </Link>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-700 border-b">
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Total Students</th>
                <th className="py-3 px-4">Total Faculties</th>
                <th className="py-3 px-4">Total Members</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((dept) => (
                <tr key={dept._id} className="text-sm text-gray-800 border-t">
                  <td className="py-3 px-4">{dept.name}</td>
                  <td className="py-3 px-4">{dept?.studentsCount}</td>
                  <td className="py-3 px-4">{dept?.facultiesCount}</td>
                  <td className="py-3 px-4">{dept.members?.length}</td>
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
              {departments?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No departments found.
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

export default ManageDepartments;
