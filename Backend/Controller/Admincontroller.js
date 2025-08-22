import User from "../Model/Usermodal.js";
import Mentor from "../Model/Mentormodel.js";
import Course from "../Model/Coursemodel.js";
import Batch from "../Model/Batchmodel.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import OTP from "../Model/Otpmodel.js";
dotenv.config()

const adminemail="admin@gmail.com"
 const adminpass="admin123"

 const checkadmin=(req,res)=>{
    const { email,password}=req.body
    console.log(req.body);

    if(email==adminemail && password==adminpass){
        res.send("done")
    }else{
        res.send("invalied cridentials")
     
    }

 }



 const getbatch = async (req, res) => {
  try {
    const { courseName } = req.body;
    const batches = await Batch.find({ coursename: courseName }); // <-- find
    console.log(batches);
    res.json(batches); // now this will be an array
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch batches" });
  }
};

 
 const addbatch = async (req, res) => {
  try {
    const { courseName, name } = req.body;
    

    if (!courseName|| !name) {
      return res.status(400).json({ message: "Course ID and Batch Name are required" });
    }

    const newBatch = new Batch({
      name,
      coursename: courseName,   
    });

    await newBatch.save();

    res.status(201).json({ message: "Batch created successfully", batch: newBatch });
  } catch (error) {
    console.error("Error adding batch:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

 
// {Course
 export const addCourse = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Course name is required" });
    }

    
    const existingCourse = await Course.findOne({ name: name.trim() });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const newCourse = new Course({ name: name.trim() });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });

  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// }







 export 
 const creatementor = async (req, res) => {
  try {
    const { name, email, phone, course, status,password } = req.body;

    if (!name || !email || !phone || !course || !status || !password)  {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await Mentor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newMentor = new Mentor({ name, email, phone, course, status });
    await newMentor.save();

    return res.status(200).json({
      msg: "Mentor created successfully",
      mentor: newMentor
    });
  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export

 const getmentor = async (req, res) => {
  try {
    const mentors = await Mentor.find(); 
    return res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


  
 export 
 const createstudent = async(req,res)=>{
    try{
        const {name,email,phone,course,batch,admission,password,active} = req.body;
      if (!name || !email || !phone  || !course || !batch || !admission || !password) {
        
        return res.status(400).json({msg:"all fiels are required"})
        
      }


      const existingUser = await User.findOne({email})

   if(existingUser){
    return res.status(400).json({msg:"user already existing"})


   }

   const newUser = new User({name,email,phone,course,batch,admission,password,active})
        
      await newUser.save()

    return res.status(200).json({ msg:"userdata new",student: newUser,

      })
    }catch{
        console.error("Error creating student:", error);
        return res.status(500).json({ success: false, message: "Server error" });
      
    }

 }
 const editmentor = async (req,res) =>{
  try{
    const {name, email, phone, course, selectedemail} =req.body;
    console.log(req.body);
    const data =  await Mentor.updateOne(
  {email: selectedemail},
  {
    $set: {
      name: name,
      email: email,
      phone: parseInt(phone),
      course: course,
      
    }
  }
    );
    return res.send(data);
  }catch (err) {
    console.log("error", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
 }

 const editstudent = async (req, res) => {
  try {
    const { name, email, phone, course, batch, admission, selectedemail } = req.body;

    console.log(req.body)

    const data = await User.updateOne(
      { email: selectedemail }, // filter
      {
        $set: {
          name: name,
          email: email,
          phone: parseInt(phone),
          course: course,
          batch: batch,
          admission: admission
        }
      }
    );

    return res.send(data); // send instead of 'sent'
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};




 export const getAllStudents = async (req, res) => {
    try {
     
      const students = await User.find({}, { password: 0 });
      return res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  
  



  const togglestudentstatus= async (req, res) => {
    try {
      const { email, active } = req.body;
      await User.updateOne(
        { email },
        { $set: { active } }
      );
      res.send({ success: true });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  }


  const handleMentorToggleStatus = async (req,res)=>{
  try {
    const {email, active} = req.body;
    console.log(req.body);

    await Mentor.updateOne(
      { email },
      { $set: {active}}
    );
    res.send({ success: true })
  } catch (error) {
    res.status(500).send({ success: false, error: err.message })
  }
  }

  const handleCourseToggleStatus = async (req,res) => {
   try {
     const {course, status} = req.body;
     console.log(req.body);
     await Course.updateOne(
      {name:course},
      {$set: {status:status}}
     );
     res.send({success: true })
   } catch (error) {
    res.status(500).send({ success: false, error: err.message })
   }
  }



// Controller function
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

await OTP.findOneAndUpdate(
  {email},
  {otp,createdAT:new Date()},
  {upsert:true,new:true}
)

    // configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // App password
  },
});

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    // ⛔ never send OTP to frontend in production!
    res.status(200).json({ success: true, message: "OTP sent successfully", otp });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};



  

 

 export {checkadmin,editstudent,sendOtp
  ,
  togglestudentstatus,editmentor,handleMentorToggleStatus,handleCourseToggleStatus,addbatch,getbatch,
 }