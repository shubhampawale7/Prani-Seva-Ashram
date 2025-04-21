import mongoose from "mongoose";

const AdoptionEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    dog: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog",
      },
      name: String,
      breed: String,
      image: String, // URL to image
    },
    emailStatus: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionEnquiry", AdoptionEnquirySchema);
