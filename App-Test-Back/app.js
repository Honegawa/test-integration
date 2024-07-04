import { ENV } from "./configs/envConfig.js";
import express from "express";
import cors from "cors";
import authorRoutes from "./routes/author.route.js";
import bookRoutes from "./routes/book.route.js";

// APP EXPRESS
const app = express();

// CORS OPTIONS
const corsOptions = {
  origin: ENV.CLIENT_ORIGIN || "http://localhost:8000",
};

// MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));

// MIDDLEWARE TO ROUTE
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

export default app;
