import User from "../models/user.model.js";

export const getAllUsersToChat = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const allOtherUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password") // Includes list of all authenticated users except loggedin User

        res.status(200).json(allOtherUsers);
    } catch (error) {
        console.log("Error in getting all users: ", error.message);
        res.status(500).json({ message: "Internal server error!" });
    }
}