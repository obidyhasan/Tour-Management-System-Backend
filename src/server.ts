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
