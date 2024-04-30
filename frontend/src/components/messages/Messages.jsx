import useGetMessage from "../../hooks/useGetMessage";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    // For scrolling to the last message
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100)
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {
        // For displaying the messages
        !loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))
      }
      {
        // For displaying the skeleton
        loading &&
          [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
      }
      {
        // For asking to start the conversation
        !loading && messages.length === 0 && (
          <p className="text-center text-gray-500">
            Send a message to start the conversation!{" "}
          </p>
        )
      }
      {/* {<Message

    />} */}
    </div>
  );
};

export default Messages;
