import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {

    // Error handling for the input fields
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      // Post request to the server to login the user
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      // Data received from the server after the user is logged in successfully
      const data = await res.json();
      
      // Error handling if the user is not logged in successfully
      // In the backend we send a error MESSAGE which we access here and throw an error
      if(data.message){
        throw new Error(data.message);
      }
      console.log(data);

      //localstorage - Storing the user data in the local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      //context - Setting the user data in the context state to be used throughout the application
      setAuthUser(data);
      toast.success("User Logged In successfully!");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

// Checks for any errors in the input fields
function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all the fields");
    return false;
  }
  return true;
}
