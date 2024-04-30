import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js"
import UserRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import path from 'path';

// PORT has to access the port number only after config() is called.
dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

//Middleware
app.use(express.json()); //Middleware to parse JSON data
app.use(cookieParser()); //Middleware to parse cookies

// Routes
app.use("/api/auth", AuthRoutes); // Routes for authentication
app.use("/api/messages", MessageRoutes); //Routes for messages
app.use("/api/users", UserRoutes); //Routes for users

// Serve static assets in production  - This is for deployment
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
})

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port ", PORT);
});
