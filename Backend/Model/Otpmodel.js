import mongoose from "mongoose";

const OtpSchema= new mongoose.Schema({

    email:{
        type: String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAT:{
    type:Date,
    default:Date.now,
    expires:300,
    }

 })


 const OTP = mongoose.model("OTP",OtpSchema);

 export default OTP 
