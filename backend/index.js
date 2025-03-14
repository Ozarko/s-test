import express from "express";
import cors from "cors";
import middleware from "./middleware/index.js";
import { connectDB } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import chatsRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fileUploadRoutes from "./routes/fileUploadRoutes.js";
import subscriptionRoutes from "./routes/userSubscriptionRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { Server } from "socket.io";
import { chatSocket } from "./sockets/chatSocket.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();

const app = express();

const FRONTEND_URL_API = process.env.FRONTEND_URL_API;
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === "production";

// Підключення до бази даних
connectDB().catch(err => {
  console.error("Failed to connect to database, exiting...");
  process.exit(1); // Завершення процесу в разі невдачі
});


if (IS_PRODUCTION) {
  app.use(
    cors({
      origin: FRONTEND_URL_API,
    })
  );
}
app.use(express.json());
// app.use(middleware.decodeToken);

// Маршрут для API

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/topics", topicRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/chats", middleware.decodeToken, chatsRoutes);

app.use("/api/attachments", fileUploadRoutes);

app.use("/api/tags", tagRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: `${FRONTEND_URL_API}`,
    methods: ["GET", "POST"],
  },
});

chatSocket(io);
