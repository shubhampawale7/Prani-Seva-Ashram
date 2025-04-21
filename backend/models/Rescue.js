import mongoose from "mongoose";

const rescueSchema = new mongoose.Schema(
  {
    dogName: {
      type: String,
      required: true,
    },
    rescuedDate: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["Good", "Injured", "Critical", "Unknown"],
      default: "Unknown",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Rescue = mongoose.model("Rescue", rescueSchema);
export default Rescue;
