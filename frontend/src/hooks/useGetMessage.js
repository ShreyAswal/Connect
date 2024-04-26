import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.error);
        }

        // console.log("messages from DB", data);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessage();
  }, [selectedConversation._id, setMessages]);

  return { loading, messages };
};

export default useGetMessage;
