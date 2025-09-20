import { io } from "socket.io-client";

const SOCKET_URL = "https://node-eve.onrender.com";
const socket = io(SOCKET_URL, {
  autoConnect: false,
  forceNew: true,
  reconnection: true,
  timeout: 5000,
});

export default socket;
