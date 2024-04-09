import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
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


    // SOCKET.IO functionality goes here

    // Save the conversation and message - 2 methods.

    // With this format the conversation will be saved first and then the message after syncronously
    // await conversation.save();
    // await newMessage.save();

    // This let's both the operations to be done in parallel and wait for both to complete
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);


  } catch (error) {
    console.log("Error in sending message: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getMessage = async (req, res) => {
  try {
    
    const { id: userToChatId } = req.params; // the id in the url is of the user the logged in user is chatting to.
    const senderId = req.user._id; // Getting the senderId from the authenticated user in the request object, the user who is logged in

    const conversation = await Conversation.findOne({
      participants: { $all: [ senderId, userToChatId]} // Fetches All messages of loggenIn User and userId in the url
    }).populate("messages"); // Not reference to messages, but the actual messages using populate

    // If conversation doesn't exist, return an empty array
    if(!conversation){
      return res.status(200).json([]);
    }
    
    // Get the messages from the conversation
    const messages = conversation.messages;
    res.status(200).json(messages);


  } catch (error) {
    console.log("Error in getting message: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
