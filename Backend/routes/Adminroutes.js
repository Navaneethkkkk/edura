import express from "express";
import {addCourse, addbatch, checkadmin, creatementor, createstudent, editmentor, editstudent, getAllStudents, getCourses, getbatch, getmentor, handleCourseToggleStatus, handleMentorToggleStatus, sendOtp, togglestudentstatus} from "../Controller/Admincontroller.js"


const  adminroutes = express.Router()

adminroutes.post("/checkadmin",checkadmin)
adminroutes.post("/studentcreate", createstudent)
adminroutes.get("/getall", getAllStudents); 
adminroutes.post("/editstudent",editstudent);
adminroutes.post("/creatementor",creatementor);
adminroutes.post("/togglestatus",togglestudentstatus);
adminroutes.post("/send-otp",sendOtp);
adminroutes.get("/getmentor",getmentor);
adminroutes.post("/editmentor",editmentor);
adminroutes.post("/addcourse", addCourse);
adminroutes.get("/getcourses", getCourses);
adminroutes.post("/mentortoggle",handleMentorToggleStatus)
adminroutes.post("/coursetoggle",handleCourseToggleStatus)
adminroutes.post("/addbatch",addbatch)
adminroutes.post("/getbatches",getbatch)




    


export default adminroutes;