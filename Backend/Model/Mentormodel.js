import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    course:String, 
    // status:String,
    active:Boolean
})
const Mentor = mongoose.model("Mentor",MentorSchema)

export default Mentor