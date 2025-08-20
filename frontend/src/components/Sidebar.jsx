import React from 'react';
import { useNavigate } from 'react-router-dom';
import Adminlogin from './Adminlogin';

function Sidebar() {
  const navigate = useNavigate()
  const handlelogout =()=>{
navigate("/Adminlogin")
  }
  const handlestudent=()=>{
    navigate("/studentslist")
  }
  const dash=()=>{
    navigate("/admindashboard")
  }
  const mentor=()=>{
    navigate("/mentorlist")
  }
  const course =()=>{
    navigate("/courselist")
  }
  const attendance =()=>{
    navigate("/attendancelist")
  }
  return (
    <>
      <div className="flex flex-col space-y-3 w-[13%] h-93vh bg-white drop-shadow-2xl pt-5 gap-7">
        
        <div className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer hover:text-white hover:bg-violet-500  group transform transition-all duration-500 hover:scale-101">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=udjU_YS4lMXL&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={dash} className=" font-medium font-serif ">Dashboard</button>
        </div>
        <div className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer hover:text-white hover:bg-violet-500  group transform transition-all duration-500 hover:scale-101">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=3901&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={handlestudent} className="text-sm font-medium font-serif">Students</button>
        </div>
        <div className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer hover:text-white hover:bg-violet-500  group transform transition-all duration-500 hover:scale-101">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=38HJBFwphJ3I&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={mentor} className="text-sm font-medium font-serif">Mentors</button>
        </div>
        <div className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer hover:text-white hover:bg-violet-500  group transform transition-all duration-500 hover:scale-101">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=60436&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={course} className="text-sm font-medium font-serif">Course</button>
        </div>
        <div className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer hover:text-white hover:bg-violet-500 transform transition-all duration-500 hover:scale-101 group">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=50896&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={attendance} className="text-sm font-medium font-serif">Attendance</button>
        </div>
       
        <div className="flex items-center gap-x-2 p-2  rounded-lg cursor-pointer hover:text-white hover:bg-violet-500 transform transition-all duration-500 hover:scale-101 group">
          <img
            className="w-6 h-6 filter group-hover:invert group-hover:sepia "
            src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000"
            alt="dashboard-icon"
          />
          <button onClick={handlelogout} className="text-sm font-medium font-serif">Logout</button>
         
        </div>
      </div>
    </>
  );
}

export default Sidebar;
