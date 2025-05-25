import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./utils/socket"; // update path as needed
import { setOnlineUsers } from "./slices/onlineUsersSlice";

const SocketConnection = () => {
  const { mockzyUser: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      if (!socket.connected) socket.connect();

      socket.emit("new-user-add", user._id);

      socket.on("get-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

    return () => {
      socket.off("get-users");
      if (socket.connected) socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        socket.emit("new-user-add", user._id);
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
