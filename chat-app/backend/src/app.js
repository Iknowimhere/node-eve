import http from "http";
import { Server } from "socket.io";
import express from "express";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import Message from "./models/Message.js";
dbConnect();

let app = express();
const server = http.createServer(app);
//middlewares
app.use(express.json());
app.use(
  cors({ origin: "https://node-9z64bt2nw-iknowimheres-projects.vercel.app" })
);

let io = new Server(server, {
  cors: {
    origin: "https://node-9z64bt2nw-iknowimheres-projects.vercel.app",
  },
});
//base route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinConversation", (conversationId) => {
    console.log("joining conversation:", conversationId);
    socket.join(conversationId);
  });

  socket.on("sendMessage", async (payload) => {
    console.log(payload);

    try {
      if (!payload) {
        console.log("no payload in sendMessage");
        socket.emit("error", "No payload provided");
        return;
      }

      const convId = payload.conversationId;
      const msgText = payload.text;
      const sndId = payload.sender || null;

      if (!convId || !msgText) {
        socket.emit("error", { message: "Invalid message payload" });
        return;
      }
      const message = await Message.create({
        conversationId: convId,
        sender: sndId,
        text: msgText,
      });
      await message.populate("sender", "username _id");
      io.to(convId).emit("newMessage", message);
    } catch (error) {
      console.error("Error handling message:", error);
      socket.emit("error", "Internal server error");
    }
  });
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
