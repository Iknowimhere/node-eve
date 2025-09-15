import mongoose from "mongoose";

let consversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroup: {
      type: Boolean,
      required: false,
    },
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", consversationSchema);

export default Conversation;
