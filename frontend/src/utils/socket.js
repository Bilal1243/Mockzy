import { io } from "socket.io-client";

export const socket = io("https://mockzy-backend.onrender.com", {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"] // Optional but can help avoid transport errors
});
