import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isReplied: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Inquiry", inquirySchema);
