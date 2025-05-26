import { io } from "socket.io-client";

const socket = io("https://mockzy-backend.onrender.com", {
  transports: ["websocket"], // force websocket
  reconnectionAttempts: 5,   // optional: retry 5 times
});

socket.on("connect", () => {
  console.log("Socket connected on frontend:", socket.id);
});

export default socket;
