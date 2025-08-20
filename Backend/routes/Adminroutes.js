import express from "express";
import {addCourse, addbatch, checkadmin, creatementor, createstudent, editmentor, editstudent, getAllStudents, getCourses, getbatch, getmentor, getstudent, handleCourseToggleStatus, handleMentorToggleStatus, togglestudentstatus} from "../Controller/Admincontroller.js"


const  adminroutes = express.Router()

adminroutes.post("/checkadmin",checkadmin)
adminroutes.post("/studentcreate", createstudent)
adminroutes.get("/getall", getAllStudents); 
adminroutes.post("/editstudent",editstudent);
adminroutes.post("/creatementor",creatementor);
adminroutes.post("/togglestatus",togglestudentstatus);
adminroutes.get("/getmentor",getmentor);
adminroutes.post("/editmentor",editmentor);
adminroutes.post("/addcourse", addCourse);
adminroutes.get("/getcourses", getCourses);
adminroutes.post("/mentortoggle",handleMentorToggleStatus)
adminroutes.post("/coursetoggle",handleCourseToggleStatus)
adminroutes.post("/addbatch",addbatch)
adminroutes.post("/getbatches",getbatch)
adminroutes.get("/getstudent",getstudent)

    


export default adminroutes;