import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: [String],
    required: true,
  },
  startHours: {
    type: [Number],
    required: true,
  },
  endMin: {
    type: [Number],
    required: true,
  },
  endHours: {
    type: [Number],
    required: true,
  },
  startMin: {
    type: [Number],
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
