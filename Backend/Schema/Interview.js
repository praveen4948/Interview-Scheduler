import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
  startDate: { type: String, required: true },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  interviewees: {
    type: [String],
    required: true,
  },
});

// create modael
const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
