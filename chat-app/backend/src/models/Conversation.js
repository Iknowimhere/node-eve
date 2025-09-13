import mongoose from "mongoose";

let consversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    groupName:{
        type:String
    }
  },

  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", consversationSchema);

export default Conversation;
