const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const batchRoutes = require("./routes/batchRoutes");
const testRoutes = require("./routes/testRoutes");

dotenv.config();
connectDB();

// Hardcoded frontend URL
const FRONTEND_URL = "https://trackmyclass-frontendd.onrender.com";

const app = express();

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL, // Use the hardcoded FRONTEND_URL
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/batches", batchRoutes);
app.use("/tests", testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
