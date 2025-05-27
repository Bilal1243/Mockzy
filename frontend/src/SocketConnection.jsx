import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./utils/socket";
import { setOnlineUsers } from "./slices/onlineUsersSlice";

const SocketConnection = () => {
  const { mockzyUser: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      if (!socket.connected) socket.connect();

      socket.on("connect", () => {
        socket.emit("user-online", user._id); // ✅ Fixed event
        socket.emit("join", user._id); // Optional: for room-based notifications
      });

      socket.on("online-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

    return () => {
      socket.off("online-users");
      socket.off("connect");
      if (socket.connected) socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        socket.emit("user-online", user._id); // ✅ Re-emit on focus
        socket.emit("join", user._id);
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [user]);

  return null;
};

export default SocketConnection;
