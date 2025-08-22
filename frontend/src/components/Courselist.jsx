import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import Course from "../../../Backend/Model/Coursemodel.js";


function Courselist() {

  
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [coursetogglestatus, setcourseStatus] = useState(0);

  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showAddModal, setshowAddModal] = useState(false);

  const [batches, setBatches] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [searchQuery,setsearchQuery] =useState("")

//   const filteredCourses = courses.filter((course) =>
//     course.course.toLowerCase().includes(searchQuery.toLowerCase())
// )

  const handleAddbatch = async () => {
    if (!batchName.trim()) {
      Swal.fire("Error!", "Please enter a batch name", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/addbatch",
        {
          courseName: selectedCourse.name,
          name: batchName,
        }
      );
      const response1 = await axios.post(
        `http://localhost:3000/admin/getbatches`,
        {
          courseName: selectedCourse.name,
        }
      );

      console.log(response1.data);
      setBatches(response1.data);

      Swal.fire({
        icon: "success",
        title: "Batch added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

   
      setBatches((prev) => [...prev, response.data]);

      setBatchName("");
      setshowAddModal(false);
    } catch (error) {
      console.error("Error adding batch", error);
      Swal.fire("Error!", "Failed to add batch", "error");
    }
  };

  const handleadd = () => {
    setshowAddModal(true);
  };

  const handleViewBatch = async (course) => {
    setShowBatchModal(true);
    setSelectedCourse(course);

    try {
      const response = await axios.post(
        `http://localhost:3000/admin/getbatches`,
        {
          courseName: course.name,
        }
      );

      console.log(response.data);
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches", error);
      Swal.fire("Error!", "Failed to load batches", "error");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getcourses")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses", err);
      });
  }, [coursetogglestatus]);

  const handleAddCourse = async () => {
    if (!courseName.trim()) {
      alert("Please enter a course name");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/admin/addcourse", {
        name: courseName,
        Active: true,
      });

      // update state after successful API call
      setCourses([...courses, res.data]);
      setCourseName("");
    } catch (error) {
      console.error("Error adding course", error);
    }
  };

  const handleCourseToggleStatus = async (course) => {
    try {
      let newStatus = course.status;
      console.log(course);
      if(newStatus=="Active"){
        newStatus="inActive"
        console.log(newStatus);
      
      }else{
        newStatus="Active"
        console.log(newStatus);
      }
      
      await axios.post("http://localhost:3000/admin/coursetoggle", {
        course: course.name,
        status: newStatus,
      });
      Swal.fire({
        icon: "success",
        title: `Student ${
          newStatus ? "activated" : "deactivated"
        } successfully`,
        timer: 1500,
        showConfirmButton: false,
      });
      setcourseStatus((prev) => prev + 1);
    } catch (error) {
      console.err("Error toggling status", error);
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white drop-shadow-2xl overflow-hidden">
      <Header />

      <div className="flex flex-row w-full flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-violet-600 font-serif">
              Course List
            </h2>
            <div className="relative w-64 ">
          <input
         
            // value={searchQuery}
            //   onChange={(e) => setsearchQuery(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full pl-9 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 drop-shadow-2xl "
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>
          </div>
         

          <div className="h-16 w-full bg-gray-100 flex items-center justify-between p-1 rounded-2xl mb-6">
            <input
              
              className="w-[30%] h-11 bg-white border rounded-2xl p-2"
              placeholder=" Course"
              type="text"
            />
            <button
              onClick={handleAddCourse}
              className="bg-violet-600 font-serif text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700 transition"
            >
              Add Course
            </button>
          </div>

          {/* Course Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-[550px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-violet-100 text-violet-700 font-semibold sticky top-0">
                <tr className="py-3">
                  <th className="px-3 py-2 ">#</th>
                  <th className="px-3 py-2">Course Name</th>
                  <th className="px-6 py-2">Status</th>
                  <th className="px-16 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course._id}

                    className="border-b bg-gray-100 hover:bg-white  transform transition-all duration-500 hover:scale-99"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{course.name}</td>
                    
                     {/* {Course.course} */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.status == "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.status == "Active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleViewBatch(course)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        View Batch
                      </button>

                      <button
                        onClick={() => handleCourseToggleStatus(course)}
                        className={`px-4 py-1 rounded-md text-sm transition ${
                          course.status=="Active"
                            ? "bg-red-500 hover:bg-green-600"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                      >
                        {course.status=="Active" ? "inActivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showBatchModal && (
        <div className="fixed inset-0  bg-black/40  flex items-center justify-center z-50">
          <div className="bg-white w-[25%] h-[40%] rounded-2xl shadow-lg flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-violet-700">Batches</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {batches && batches.length > 0 ? (
                  batches.map((batch, i) => (
                    <li key={i} className="p-2 rounded-lg bg-gray-100">
                      {batch.name}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No batches found</p>
                )}
              </ul>
            </div>

            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={handleadd}
                className=" bg-violet-600 font-serif text-white px-4 py-2 rounded-lg"
              >
                Add Batch
              </button>
              <button
                onClick={() => setShowBatchModal(false)}
                className="bg-gray-400 text-white font-serif px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              {/* Modal */}
              {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center  bg-black/40  bg-opacity-50 z-50">
                  <div className="bg-white w-80 rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-violet-600 mb-4">
                      Add Batch
                    </h2>

                    <input
                      type="text"
                      placeholder="Enter batch name"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setshowAddModal(false)}
                        className="px-4 py-2 rounded-lg border border-gray-400 text-white hover:bg-gray-700 bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddbatch}
                        className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courselist;
