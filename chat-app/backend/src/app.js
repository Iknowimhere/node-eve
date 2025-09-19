import http from "http";
import { Server } from "socket.io";
import express from "express";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
dbConnect();

let app = express();
const server = http.createServer(app);
//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

let io = new Server(server, {
  cors: {
    origin: "*",
  },
});
//base route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", async (socket) => {
  try {
    console.log("a user connected", socket.id);

    socket.on("joinConversation", (conversationId) => {
      console.log("joining conversation:", conversationId);
      socket.join(conversationId);
    });

    socket.on("sendMessage", (payload) => {
      if (!payload) {
        console.log("no payload in sendMessage");
        socket.emit("error", "No payload provided");
        return;
      }
      if (payload) {
        console.log("message received at server:", payload);
        io.to(payload.conversation).emit("newMessage", payload);
        return;
      }
    });

    const convId = payload.conversation;
    const msgText = payload.text;
    const sndId = payload.sender || null;

    if (!convId || !msgText) {
      socket.emit("error", { message: "Invalid message payload" });
      return;
    }

    const message = await Message.create({
      conversation: convId,
      sender: sndId,
      text: msgText,
    });
    await message.populate("sender", "username");
    io.to(convId).emit("newMessage", message);
  } catch (error) {
    console.log("error in socket connection", error);
    socket.emit("error", { message: "Internal server error" });
  }
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
