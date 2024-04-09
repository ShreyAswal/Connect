import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req,res,next) => {
    try {
        // Cookies object from request contains JWT key with value of token
        const token = req.cookies.JWT;
        // console.log("token: ",token);
        // console.log("Request cookies: ",req.cookies);
        if(!token){
            return res.status(401).json({error: "Unauthorized - No Token Provided!"});
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token!"});
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({error: "User not found!"});
        }

        //Setting the user in the request object to authenicated user from DB
        req.user = user;

        // Calling next() to move to the next middleware
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error!" });
    }
}

export default protectRoute;