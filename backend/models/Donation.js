import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    paymentId: {
      type: String,
      required: true,
    },
    // Changed 'date' to 'createdAt' to match the default behavior of Mongoose timestamps
    // and for consistency with how you sort in getAllDonations
    // You can keep 'date' if you explicitly set it during creation,
    // but createdAt is generally preferred for record creation time.
    date: {
      type: Date,
      default: Date.now,
    },
    // NEW: Add status field
    status: {
      type: String,
      enum: ["Pending", "Processed", "Refunded", "On Hold"], // Define allowed statuses
      default: "Pending", // Default status for new donations
    },
    // NEW: Add notes field as an array of objects
    notes: [
      {
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        // You might want to add 'addedBy' if you have admin user IDs
        // addedBy: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'User' // Assuming you have a User model
        // }
      },
    ],
    // Add timestamps for createdAt and updatedAt if you haven't already
    // This is good practice for all models
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
