// Is going to return state and not html so this is js file.

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const UseSignup = () => {
  const [loading, setLoading] = useState(false);
  
  // Getting one of the functions from the context to set the user data in the context state after the user is created successfully
  const {setAuthUser} = useAuthContext();

  // Function to handle the signup process of the user and send the data to the server
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      // Post request to the server to create a new user
      const res = await fetch("/api/auth/signup", {
      method:"post",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
    });

    // Data received from the server after the user is created successfully
    const data = await res.json();
    if(data.error){
      throw new Error(data.error);
    }
    console.log(data);

    //localstorage - Storing the user data in the local storage
    localStorage.setItem("chat-user", JSON.stringify(data))
    //context - Setting the user data in the context state to be used throughout the application
    setAuthUser(data);
    toast.success("User created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, signup}
};

export default UseSignup;

// Checks for any errors in the input fields
function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}
