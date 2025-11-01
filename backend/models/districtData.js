import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: String,
  active_workers: Number,
  completed_households: Number,
  funds_utilized: Number,
  history: String,
});

const District = mongoose.model("District", districtSchema);
export default District;
