import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: String,
  age: String,
  breed: String,
  gender: String,
  mood: String,
  description: String,
  image: String,
  vaccinated: Boolean,
  adopted: {
    type: Boolean,
    default: false,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Dog", dogSchema);
