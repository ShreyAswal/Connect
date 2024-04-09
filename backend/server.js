import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js"
import UserRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

// PORT has to access the port number only after config() is called.
dotenv.config();
const PORT = process.env.PORT;

//Middleware
app.use(express.json()); //Middleware to parse JSON data
app.use(cookieParser()); //Middleware to parse cookies

app.use("/api/auth", AuthRoutes); //Middleware to use the routes for authentication
app.use("/api/messages", MessageRoutes); //Routes for messages
app.use("/api/users", UserRoutes); //Routes for users

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port ", PORT);
});
