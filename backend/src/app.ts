
import express from "express";

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StockPilot API is running",
  });
});

export default app;
