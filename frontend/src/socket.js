import { io } from "socket.io-client";

const socket = io("https://real-time-notification-backend-ilqa.onrender.com",{
    transports: ["websocket", "polling"], // Ensure both protocols are enabled
  }); 

export default socket;
