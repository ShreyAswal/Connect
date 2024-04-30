import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id; // Check if the message is sent by the logged in user
  // If the message is sent by the logged in user, then the chat will be displayed at the end of the chat window, else at the start
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formatedTime = extractTime(message.createdAt);
  // If the message is sent by the logged in user, then the profile picture of the logged in user will be displayed, else the profile picture of the selected conversation
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // const name = fromMe ? authUser.username : selectedConversation?.username;

  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      {/* <div className="chat-header">
        {name}
        <time className="text-xs opacity-50">12:46</time>
      </div> */}
      <div
        className={`chat-bubble ${bubbleBgColor} text-white pb-2 ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50">{formatedTime}</div>
    </div>
  );
};

export default Message;
