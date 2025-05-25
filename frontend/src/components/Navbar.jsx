import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, CheckCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { io } from "socket.io-client";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from "../slices/notificationApiSlice";
import { setNotifications, addNotification } from "../slices/notificationSlice";
import { formatDistanceToNow } from "date-fns";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const Navbar = () => {
  const { mockzyUser } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [logoutUser] = useLogoutUserMutation();
  const { data, isSuccess } = useGetNotificationsQuery();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const links = {
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
      { label: "Departments", path: "/organization/manage-departments" },
      { label: "Mock Interviews", path: "/organization/mockinterviews" },
    ],
  };

  const linksToShow = mockzyUser?.role ? links[mockzyUser.role] : [];

  const handleLogout = useCallback(async () => {
    try {
      socket.emit("offline", mockzyUser?._id);
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }, [logoutUser, dispatch, mockzyUser, navigate]);

  useEffect(() => {
    if (isSuccess && data) dispatch(setNotifications(data));
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (!mockzyUser?._id) return;

    // Emit join when connected
    socket.on("connect", () => {
      socket.emit("join", mockzyUser._id);
    });

    // Listen for incoming notifications
    socket.on("new-notification", (notif) => {
      if (notif.recipient === mockzyUser._id) {
        dispatch(addNotification(notif));
      }
    });

    return () => {
      socket.off("connect");
      socket.off("new-notification");
    };
  }, [mockzyUser, dispatch]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      dispatch(setNotifications([]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-black">
          Mockzy
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {linksToShow.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-black hover:text-gray-600 font-medium transition"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-8 w-80 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                <div className="p-3 border-b flex justify-between items-center">
                  <span className="font-semibold">Notifications</span>
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <Link to={n.link} key={i}>
                      <div className="flex items-start gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b cursor-pointer">
                        <CheckCircle
                          className="text-green-500 mt-1"
                          size={16}
                        />
                        <div>
                          <p>{n.title}</p>
                          <p className="text-xs">{n.message}</p>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(n.createdAt))} ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-sm text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex gap-3 items-center">
          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-3">
          {linksToShow.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-black font-medium hover:text-gray-600 transition"
            >
              {link.label}
            </Link>
          ))}
          {mockzyUser && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-black font-medium hover:text-gray-600 transition"
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
