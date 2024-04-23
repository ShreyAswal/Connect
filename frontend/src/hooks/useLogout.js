import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.message) {
        localStorage.removeItem("chat-user");
        // console.log(data.message);
        setAuthUser(null);
        toast.success(data.message);
      } else {
        throw new Error("Logout failed!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
