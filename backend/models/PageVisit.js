import mongoose from "mongoose";

const pageVisitSchema = mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    // Optional: If you track logged-in users
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: false, // Not every visit will be by a logged-in user
    },
    userAgent: {
      // Useful for more unique visitor identification
      type: String,
      required: false,
    },
    sessionID: {
      // A simple way to track sessions if you don't have full user auth
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

pageVisitSchema.index({ path: 1, createdAt: -1 });
pageVisitSchema.index({ ipAddress: 1, createdAt: -1 });

const PageVisit = mongoose.model("PageVisit", pageVisitSchema);

export default PageVisit;
