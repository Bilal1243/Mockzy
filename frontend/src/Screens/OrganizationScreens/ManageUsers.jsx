import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../slices/organizationApiSlice";
import { formatDistanceToNow } from "date-fns";
import { exportToExcel } from "../../utils/exportToExcel";

const ManageUsers = () => {
  const { mockzyUser } = useSelector((state) => state.auth);
  const onlineUsers = useSelector((state) => state.onlineUsers.users);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: users,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    organization: mockzyUser?.userId,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isOnline = (userId) =>
    onlineUsers.some((onlineUser) => onlineUser.userId === userId);

  const handleDownload = () => {
    setIsDownloading(true);
    const columnMap = {
      name: "Name",
      email: "Email",
      role: "Role",
      status: "Status",
    };

    const formattedData = users.map((user) => ({
      name: user?.userDetails?.name || "N/A",
      email: user.email || "N/A",
      role: user.role || "N/A",
      status: isOnline(user._id)
        ? "Online"
        : user?.lastSeen
        ? `Last seen ${formatDistanceToNow(new Date(user.lastSeen), {
            addSuffix: true,
          })}`
        : "Not logged in",
    }));

    exportToExcel(formattedData, "users", columnMap);

    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          <div className="flex gap-2">
            <Link
              to="/organization/add-user"
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add User
            </Link>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`${
                isDownloading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600"
              } text-white px-5 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2`}
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Downloading...
                </>
              ) : (
                "Download Excel"
              )}
            </button>
          </div>
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
                <tr key={user._id} className="text-sm text-gray-800 border-t">
                  <td className="py-3 px-4">{user?.userDetails?.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        isOnline(user._id)
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isOnline(user._id)
                        ? "online"
                        : user?.lastSeen
                        ? `last seen ${formatDistanceToNow(
                            new Date(user.lastSeen),
                            { addSuffix: true }
                          )}`
                        : "not logged in since account creation"}
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
              {users?.length === 0 && (
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
