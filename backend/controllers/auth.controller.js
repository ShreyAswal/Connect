import User from "../models/user.model.js";

export const signup = async (req,res) => {
    try {
        console.log('signup Route');
        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message: 'Password does not match!'});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({message: 'User already exists!'});
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Format to Save as document in database
        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        // Response format sent to client
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        }) 

    } catch (error) {
        console.log('Error: ',error.message);
        res.status(500).json({message:"Internet server error!"});
        
    }    
}

export const login = (req,res) => {
    console.log('Login Route');
    res.send('Login Route!');
}

export const logout = (req,res) => {
    console.log('logout Route');
    res.send('logout Route!');
}
