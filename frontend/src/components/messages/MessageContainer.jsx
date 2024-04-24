import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

// Main Messages Container component
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Cleanup function to reset selectedConversation to null when component unmounts
    // For displaying NochatSelected after user logout's with a chat open and logins again
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header for messageBox*/}
          <div className="☐ bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold ">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

// Default component to show when no chat is selected
const NoChatSelected = () => {
  let data = localStorage.getItem("chat-user");
  data = JSON.parse(data);
  const user = data.fullName;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col
  items-center gap-2"
      >
        <p>Welcome 👋 {user} 💝</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3x1 md:text-6xl text-center" />
      </div>
    </div>
  );
};
