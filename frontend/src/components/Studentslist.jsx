import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

import Swal from "sweetalert2";
import { editstudent } from "../../../Backend/Controller/Admincontroller.js";

function Studentslist() {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [count, setcount] = useState(0);
  const [selectedstudent, setselectedstudent] = useState({});
  const [viewModal, setviewModal] = useState(false)
  const [selectedStudent,setSelectedStudent]=useState("")

  const [name, setname] = useState("");

  const [email, setemail] = useState("");
  const [selectedemail, setselectedemail] = useState("");
  const [phone, setphone] = useState(0);
  const [course, setcourse] = useState("");
  const [batch, setbatch] = useState("");
  const [admission, setadmission] = useState("");
  const [password, setpassword] = useState("");

  const [students, setStudents] = useState([]);

  const [editstudent, seteditstudent] = useState(0);



  const handleToggleStatus = async (student) => {
    try {
      const newStatus = !student.active;

      await axios.post("http://localhost:3000/admin/togglestatus", {
        email: student.email,
        active: newStatus,
      });

      seteditstudent(editstudent + 1); 

      Swal.fire({
        icon: "success",
        title: `Student ${
          newStatus ? "activated" : "deactivated"
        } successfully`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error toggling status", error);
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const createStudent = {
      name,
      email,
      phone,
      course,
      batch,
      active: true,
      admission,
      password,
    };

    try {
      await axios.post(
        "http://localhost:3000/admin/studentcreate",
        createStudent
      );
      setShowModal(false);

      setname("");
      setemail("");
      setphone("");
      setcourse("");
      setbatch("");
      setadmission("");
      setpassword("");

      Swal.fire({
        icon: "success",
        title: "Student Added!",
        text: "The Student has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding mentor", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Memtor",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/getall");
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, [editstudent]);

  const handleeditsubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `http://localhost:3000/admin/editstudent`,
            {
              name: selectedstudent.name,
              email: selectedstudent.email,
              phone: selectedstudent.phone,
              course: selectedstudent.course,
              admission: selectedstudent.admission,
              batch: selectedstudent.batch,
              selectedemail,
            }
          );

          if (response.data) {
            const newcount = count + 1;
            setcount(count + 1);
            setEditModal(false);
            seteditstudent(newcount);

            /// ✅ clear selection
            Swal.fire("Saved!", "", "success"); // ✅ confirmation
          } else {
            Swal.fire("Error!", "Failed to update student", "error");
          }
        } catch (err) {
          console.error("Edit failed", err);
          Swal.fire("Error!", "Something went wrong", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleedit = (student) => {
    setselectedemail(student.email);
    setname(student.name);
    setemail(student.email);
    setphone(student.phone);
    setcourse(student.course);
    setbatch(student.batch);
    setadmission(student.admission);
    setpassword(student.password || "");
    setselectedstudent(student); 
  };

    
    const handleview = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/getstudent");
        setSelectedStudent(response.data);
        setviewModal(true);
      } catch (err) {
        console.error("Error fetching student details", err);
        Swal.fire("Error!", "Failed to fetch student details", "error");
      }
    };

  
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white drop-shadow-2xl overflow-hidden">
        <Header />

        <div className="flex flex-row w-full flex-1 overflow-hidden">
          <Sidebar />

          <div className="flex-1 p-5 ">
            <div className="flex items-center justify-between mb-6">
              <div className="w-[15%] bg-violet-600 py-3 px-4 rounded-xl shadow-md">
                <h2 className="text-white font-serif text-md font-semibold text-center ">
                  Students List
                </h2>
              </div>
              <div className="p-10">
                <button
                  onSubmit={() => {
                    handlesubmit();
                  }}
                  onClick={() => setShowModal(true)}
                  className="bg-violet-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-violet-700 transition font-serif"
                >
                  + Add Student
                </button>

                {/* Modal */}
                {showModal && (
                  <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50  bg-black/35 ">
                    <div className="bg-white rounded-xl shadow-xl w-[30%] p-8">
                      <form onSubmit={(e) => handlesubmit(e)}>
                        <h2 className="text-2xl font-bold mb-6 text-center text-violet-500">
                          Add Student
                        </h2>

                        <div className="space-y-4">
                          <input
                            onChange={(e) => setname(e.target.value)}
                            id="name"
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Name"
                          />

                          <input
                            onChange={(e) => setemail(e.target.value)}
                            id="email"
                            type="email"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Email"
                          />

                          <input
                            onChange={(e) => setphone(e.target.value)}
                            id="phone"
                            type="tel"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Phone no "
                          />
                          <input
                            onChange={(e) => setcourse(e.target.value)}
                            id="course"
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Course"
                          />

                          <input
                            onChange={(e) => setbatch(e.target.value)}
                            id="batch"
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Batch"
                          />

                          <input
                            onChange={(e) => setadmission(e.target.value)}
                            id="admissionNo"
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Admission no"
                          />

                          <input
                            onChange={(e) => setpassword(e.target.value)}
                            id="admissionNo"
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder=" Password"
                          />
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                          >
                            Add Student
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" overflow-auto rounded-2xl  max-h-[550px] overflow-y-auto ">
              <table className="w-full  shadow-md ">
                <thead className="bg-violet-600 text-white sticky top-0 ">
                  <tr>
                    <th className="text-left px-4 py-2">No</th>
                    <th className="text-left px-6 py-2">Name</th>
                    <th className="text-left px-6 py-2">Email</th>
                    <th className="text-left px-6 py-2">Phone</th>
                    <th className="text-left px-6 py-2">Course</th>
                    <th className="text-left px-6 py-2">Batch</th>
                    <th className="text-left px-6 py-2">Admission No</th>
                    <th className="text-left px-6 py-2">status</th>
                    <th className="text-left px-16 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b bg-gray-100 hover:bg-white transform transition-all duration-500 hover:scale-99   "
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-6 py-2  break-all">
                        {student.name}
                      </td>
                      <td className="px-6 py-2  break-all">
                        {student.email}
                      </td>
                      <td className="px-6 py-2 ">
                        {student.phone}
                      </td>
                      <td className="px-6 py-2">{student.course}</td>
                      <td className="px-6 py-2">{student.batch}</td>
                      <td className="px-6 py-2">{student.admission}</td>
                      <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.active 
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.active ? "Active" : "Inactive"}
                      </span>
                      </td>
                      <td className="px-3 py-2 align-middle flex justify-center items-center gap-2 h-full">
                    
                        <button
                          onClick={() => handleview(student._id)}
                          className=" text-white px-3 py-1 rounded hover:bg-blue-950"
                        >
                          👁 View
                        </button>
                      
  <button
    onClick={() => {
      handleedit(student);
      setEditModal(true);
    }}
    className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600 transition"
  >
    Edit
  </button>
  <button
    onClick={() => handleToggleStatus(student)}
    className={`px-4 py-1 rounded-md text-sm transition ${
      student.active
        ? "bg-green-500 hover:bg-green-600"
        : "bg-red-500 hover:bg-red-600"
    } text-white`}
  >
    {student.active ? "Active" : "Inactive"}
  </button>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {viewModal && selectedstudent && (
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {}</p>
            <p><strong>Email:</strong> {}</p>
            <p><strong>Phone:</strong> {}</p>
            <p><strong>Course:</strong> {}</p>
            <p><strong>Batch:</strong> {}</p>
            <p><strong>Admission No:</strong> {}</p>
            <p><strong>Password:</strong> {}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setviewModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && selectedStudent && (
        <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50   bg-black/35 ">
          <div className="bg-white rounded-xl shadow-xl w-[30%] p-8">
            <form onSubmit={(e) => handleeditsubmit(e)}>
              <h2 className="text-2xl font-bold mb-6 text-center text-violet-500">
                Edit Student
              </h2>

              <div className="space-y-4">
                <input
                  value={selectedstudent.name || ""}
                  onChange={(e) => {
                    console.log(selectedstudent);
                    setselectedstudent({
                      ...selectedstudent,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                />

                <input
                  value={selectedstudent.email || ""}
                  onChange={(e) =>
                    setselectedstudent({
                      ...selectedstudent,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  className="w-full border px-3 py-2 rounded-md"
                />

                <input
                  value={selectedstudent.phone || ""}
                  onChange={(e) =>
                    setselectedstudent({
                      ...selectedstudent,
                      phone: e.target.value,
                    })
                  }
                  type="phone"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  value={selectedstudent.course || ""}
                  onChange={(e) =>
                    setselectedstudent({
                      ...selectedstudent,
                      course: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                />

                <input
                  value={selectedstudent.batch || ""}
                  onChange={(e) =>
                    setselectedstudent({
                      ...selectedstudent,
                      batch: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                />

                <input
                  value={selectedstudent.admission || ""}
                  onChange={(e) =>
                    setselectedstudent({
                      ...selectedstudent,
                      admission: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Studentslist;
