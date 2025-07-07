/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://exampleApp:exampleApp@cluster0.0m3jt.mongodb.net/tour-management?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Connected to DB!!");

    server = app.listen(5000, () => {
      console.log(`🔥 Server is listening to port 5000`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

/**
 * unhandled rejection error -> promise not handled
 * uncaught rejection error
 * signal termination - sigterm
 */

process.on("unhandledRejection", () => {
  console.log("🚫 Unhandled Rejection detected. Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("🚫 Uncaught Exception detected. Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("🚫 SIGTERM signal received. Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("🚫 SIGINT signal received. Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Unhanded rejection error
// Promise.reject(new Error("I Forgot to catch this promise"));

// Uncaught Exception Error
// throw new Error("I forgot to handle this local error");
