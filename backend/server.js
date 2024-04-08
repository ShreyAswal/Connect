import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.routes.js";
import MessageRoute from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

// PORT has to access the port number only after config() is called.
dotenv.config();
const PORT = process.env.PORT;

//Middleware
app.use(express.json()); //Middleware to parse JSON data
app.use(cookieParser()); //Middleware to parse cookies

app.use("/api/auth", AuthRoute);
app.use("/api/messages", MessageRoute);

app.listen(PORT, () => {
    connectToMongoDB();
  console.log("Server is running on port ", PORT);
});
