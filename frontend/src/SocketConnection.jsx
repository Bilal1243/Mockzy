// components/SocketManager.jsx
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "./slices/onlineUsersSlice";

const SocketConnection = () => {
  const { mockzyUser: user } = useSelector((state) => state.auth);
  const socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      socket.current = io("http://localhost:5000");

      socket.current.emit("new-user-add", user._id);

      socket.current.on("get-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        socket.current.emit("new-user-add", user._id);
      }
    };

    const handleBlur = () => {
      if (user?._id) {
        socket.current.emit("offline");
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [user]);

  return null; // this component just manages the socket logic
};

export default SocketConnection;
