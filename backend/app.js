import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import mgnregaRoutes from "./routes/mgnregaRoutes.js";  // 👈 add this line
import mgnregaRoutes from "./routes/mgnrega.js";
import workerRoutes from "./routes/workerRoutes.js";


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/mgnrega", mgnregaRoutes);
app.use("/api/workers", workerRoutes);
// MongoDB connection
const dbUrl = process.env.MONGO_URL;
if (!dbUrl) {
  console.error("❌ MongoDB URL not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
// app.use("/api", mgnregaRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
