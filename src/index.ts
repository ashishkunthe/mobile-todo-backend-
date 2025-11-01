import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "server running",
  });
});

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI!, {})
  .then(() => app.listen(PORT, () => console.log("Server running", PORT)))
  .catch((err) => console.error(err));
