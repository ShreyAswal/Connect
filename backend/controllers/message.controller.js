import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
const sendMessage = async (req, res) => {
  try {
    console.log("Request body: ", req.body);
    const message = req.body.message;
    const { id: receiverId } = req.params; //destructuring the id from the params, same as req.params.id, id in the url is of receiver user
    const senderId = req.user._id; // Getting the senderId from the authenticated user in the request object

    // Check if the conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      // $all operator is used to match all the elements in the array.
      participants: { $all: [senderId, receiverId]}
    })

    // If conversation doesn't exist, create a new conversation
    if(!conversation){
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    console.log("New message: ", newMessage);

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    console.log("Conversation: ", conversation);

    // Save the conversation and message
    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);


  } catch (error) {
    console.log("Error in sending message: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export default sendMessage;
