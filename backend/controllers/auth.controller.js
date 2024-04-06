import generateTokenAndSetCookie from "../../utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    console.log("signup Route");
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match!" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Format to Save as document in database
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
        // Generate a JWT token for the user
        generateTokenAndSetCookie(newUser._id, res); // Set JWT cookie

        // Save the new user to the database
      await newUser.save();

      // Response format sent to client
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
        res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (error) {
    console.log("Error in signup functionality: ", error.message);
    res.status(500).json({ message: "Internet server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // The "" is used to handle the response from bcrypt
    console.log("isPasswordCorrect: ", isPasswordCorrect,"\nUser pass :", user?.password);

    if( !user || !isPasswordCorrect ){
      // Here we can't send response directly without using return keyword.
      // If sent directly, it will throw an error and crash the server because it continues to execute the code after the error below.
      // So, we return a response and stop the execution of the code as there is another response below which will crash the server if executed.
      return res.status(400).json({message: "User does not exist or Incorrect Password!"});
    }

    // Generate a JWT token for the user
    generateTokenAndSetCookie(user._id, res); // Set JWT cookie

    // Response format sent to client on login
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    })
  } catch (error) {
    console.log("Error login functionality: ", error.message);
    res.status(500).json({ message: "Internet server error!" });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("JWT", "", {
      maxAge: 0
    })
    res.status(200).json({ message: "Logged out successfully!" });
    
  } catch (error) {
    console.log("Error in logout functionality: ", error.message);
    res.status(500).json({ message: "Internet server error!" });
  }
};


