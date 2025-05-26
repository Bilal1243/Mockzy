import { io } from "socket.io-client";

export const socket = io("https://mockzy-backend.onrender.com", {
  autoConnect: false
});
