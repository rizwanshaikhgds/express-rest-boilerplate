import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import indexRoutes from "./routes/indexRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import basicAuth from "express-basic-auth";
import { swaggerUi, swaggerSpec } from "./swaggerConfig.js";

// Load env variables
dotenv.config();

// Port
const PORT = process.env.PORT || 8080;

// Initializing express server
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // Handle CORS error (allow all cross origins)
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse form-urlencoded data
app.use(express.static("views/public")); // Serve static files from public folder
app.use(morgan("combined")); // Log all incoming requests info

// Basic Auth setup
app.use(basicAuth({
    users: { [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD },
    challenge: true,
  }));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", indexRoutes);
app.use("/api/v1", apiRoutes); // Use the API routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`Express Backend is running on port: ${PORT}`));
// Listening to all requests