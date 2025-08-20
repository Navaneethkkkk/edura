import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
// import { Eye, EyeOff } from "lucide-react";


import Adminlogo from './Adminlogo';

function Adminlogin() {



 
  const [showPassword, setShowPassword] = useState(false);


  
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const navigate = useNavigate()


  const handlesubmit = async (e)=>{
    e.preventDefault(); 

    

    const response = await axios.post("http://localhost:3000/admin/checkadmin",{email,password})
    if (response.data === "done"){
      navigate("/Admindashboard")
    }else{
      alert("password incorrect")
    }

  }
  


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
    
     
      <div className="w-full max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[800px] h-auto md:h-[60vh] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
      
        {/* Left Panel */}
        <div className="w-full md:w-[60%] bg-violet-500 text-white p-8 md:p-10 md:rounded-r-[100px] flex flex-col justify-center items-start">
          <h2 className="text-lg sm:text-xl font-semibold drop-shadow-md">Welcome To</h2>
          <h1 className="text-4xl sm:text-6xl font-black mt-3 drop-shadow-xl">EDURA</h1>
          <p className="mt-4 sm:mt-6 italic text-base sm:text-lg">
            Presence is the start of progress.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center items-center bg-white">
          <h2 className="text-violet-500 text-xl sm:text-2xl font-bold mb-4 tracking-widest">
            ADMIN LOGIN
          </h2>

          <form onSubmit={(e)=>{handlesubmit(e)}} className="w-full flex flex-col items-center">
            <input
            onChange={(e)=>setemail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              className="w-full px-6 py-3 rounded-[10px] bg-violet-400 text-white placeholder-white text-md mb-4"
              required
            />
         <input
        onChange={(e) => setpassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        className="w-full px-6 py-3 rounded-[10px] bg-violet-400 text-white placeholder-white text-md mb-6 pr-12"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
      >
        
      </button>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 transition duration-300 text-white px-10 py-3 rounded-xl font-serif"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
