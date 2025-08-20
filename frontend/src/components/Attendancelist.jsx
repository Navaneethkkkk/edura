import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // keep base styles, we’ll override with Tailwind
import Sidebar from "./Sidebar";
import Header from "./Header";

function Attendancelist() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Example attendance data (replace with API response)
  const attendance = [
    { date: "2025-08-10", status: "Present" },
    { date: "2025-08-11", status: "Absent" },
    { date: "2025-08-12", status: "Present" },
    { date: "2025-08-15", status: "Absent" },
  ];

  // Check if a date has attendance record
  const getAttendanceStatus = (date) => {
    const formatted = date.toISOString().split("T")[0];
    const record = attendance.find((a) => a.date === formatted);
    return record ? record.status : null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">📅 Student Attendance Calendar</h1>

          {/* Calendar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date }) => {
                const status = getAttendanceStatus(date);
                if (status === "Present") {
                  return "bg-green-500 text-white rounded-full hover:opacity-80";
                }
                if (status === "Absent") {
                  return "bg-red-500 text-white rounded-full hover:opacity-80";
                }
                return "hover:bg-gray-200 rounded-full";
              }}
              className="w-full border-0 text-center"
            />
          </div>

          {/* Details */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow max-w-lg">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p>
              <span className="font-medium">Selected Date:</span>{" "}
              {selectedDate.toDateString()}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {getAttendanceStatus(selectedDate) || (
                <span className="text-gray-500">No record</span>
              )}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Attendancelist;
