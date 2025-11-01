import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  jobType: String,
  workDays: Number,
  wagePerDay: Number,
  totalWage: Number,
  district: String,
  state: String,
});

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
