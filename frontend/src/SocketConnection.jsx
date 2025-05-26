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

      // Only after connect, emit join
      socket.on("connect", () => {
        socket.emit("new-user-add", user._id);
        socket.emit("join", user._id); // join notification room
      });

      socket.on("get-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

    return () => {
      socket.off("get-users");
      socket.off("connect");
      if (socket.connected) socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        socket.emit("new-user-add", user._id);
        socket.emit("join", user._id); // Rejoin on focus
      }
    };

    const handleBlur = () => {
      if (user?._id) {
        socket.emit("offline", user._id);
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [user]);

  return null;
};

export default SocketConnection;
