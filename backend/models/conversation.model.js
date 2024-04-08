import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
    {
        participants: [
            {
                // The special method mongoose.Schema.Types.ObjectId is used to specify that the array will contain objects of the type => Id's from the User collection in the DB.
                // We will be storing User Id's in this array.
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        conversation: [
            {
                // We will be storing Message Id's in this array.
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                default: []
            }
        ]
    }, 
    {timestamps: true}
)

const Conversation = mongoose.model("Conversation",conversationSchema)

export default Conversation;