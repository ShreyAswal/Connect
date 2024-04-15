import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useLogout = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {

        const res = await fetch("/api/auth/logout", {
            method:"post",
            headers:{ "Content-Type":"application/json" },
        });
        const data = await res.json();
        if(data.message){
            throw new Error(data.message);
        }

        localStorage.removeItem("chat-user");
        setAuthUser(null);

    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  }
  return {loading, logout};
}

export default useLogout
