import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  coursename:{ type: String, required: true, unique: true },
  status: { type: String, default: "Active" }
}, { timestamps: true });

 const Batch = mongoose.model("Batch", courseSchema);
export default Batch