import React from "react";
import Chart from "./Chart";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Admindashboard() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-white drop-shadow-2xl overflow-hidden ">
        <Header />

        <div className="flex flex-row w-full flex-1 overflow-hidden ">
          <Sidebar />

          <div className="flex flex-col flex-1 p-6 overflow-y-hidden ">
            <h1 className="text-xl font-semibold mb-6 transform transition-all duration-500 hover:scale-99">Today Summary</h1>

            <div className="flex flex-row justify-between space-x- mb-10  ">
              <div className="w-1/4 h-[10vh] bg-white shadow-lg rounded-2xl flex items-center px-4 space-x-4 transform transition-all duration-500 hover:scale-103">
                <img
                  className="w-10 h-10"
                  src="https://img.icons8.com/?size=100&id=pmI82Oq5PUQF&format=png&color=40C057"
                  alt="Present"
                />
                <div className="flex flex-col justify-center transform transition-all duration-500 hover:scale-101">
                  <h1 className="font-semibold text-gray-700 font-serif">
                    Present Students
                  </h1>
                  <h2 className="text-xl font-bold">0</h2>
                </div>
              </div>


              <div className="w-1/4 h-[10vh] bg-white shadow-lg rounded-2xl flex items-center px-4 space-x-4 transform transition-all duration-500 hover:scale-103">
              <img
                  className="w-10 h-10"
                  src="https://img.icons8.com/?size=100&id=olDsW0G3zz22&format=png&color=000000"
                  alt="Present"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold text-gray-700 font-serif">
                   Absent Students
                  </h1>
                  <h2 className="text-xl font-bold">0</h2>
                </div>
              </div>


              <div className="w-1/4 h-[10vh] bg-white shadow-lg rounded-2xl flex items-center px-4 space-x-4 transform transition-all duration-500 hover:scale-103">
                <img className="w-10 h-10"
                 src="https://img.icons8.com/?size=100&id=8ZwVTgxSGaqM&format=png&color=000000"
                  alt="" />
                  <div className=" flex flex-col justify-center">
                  <h1 className="font-semibold text-gray-700 font-serif">Total Students</h1>
                  <h2 className="text-xl font-bold">0</h2>


                  </div>
                
              </div>
            </div>



            <h1 className="font-serif font-semibold text-3xl text-violet-500 mb-6 flex justify-center">
              Student Attendance
            </h1>

            <div className="flex justify-center items-center w-full mt-6">
              <div className="w-[90%] bg-gray-400/20 rounded-2xl drop-shadow-5xl h-[50vh] flex justify-center items-center">
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admindashboard;
