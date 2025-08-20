import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';


function Mentorlist() {
  const [mentors, setMentors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [editModal, setmentorEditModal] = useState (false)
  
  const [selectedMentor,setSelectedMentor] = useState()
  const [editmentor,seteditmentor] = useState(0)

  const [selectedemail,setselectedemail] = useState("")
  const [count,setcount] =useState(0)
  const [statustogle,settogleStatus] =useState(0)
 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [password,setpassword] = useState('')
  const [status, setStatus] = useState('Active');

  const handleMentorToggleStatus = async (mentor) =>{
  try {
    console.log(mentor.active);
    const newStatus = !mentor.active;
    await axios.post("http://localhost:3000/admin/mentortoggle",{
      email: mentor.email,
      active: newStatus,
    });

    Swal.fire({
      icon: "success",
      title: `Student ${
        newStatus ? "activated" : "deactivated"
      } successfully`,
      timer: 1500,
      showConfirmButton: false,
    });
    settogleStatus(prev => prev + 1)
  } catch (error) {
    
  }console.error("Error toggling status", error);
      Swal.fire("Error!", "Failed to update status", "error");
}
  

  
 
  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/getmentor');
      console.log(response.data);
      setMentors(response.data);
    } catch (error) {
      console.error('Failed to fetch mentors', error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [editmentor,statustogle]);

  const handleeditMentor = async (e) =>{
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
if(result.isConfirmed){
  try{
    const response = await axios.post(`http://localhost:3000/admin/editmentor`,{
      name:selectedMentor.name,
      email:selectedMentor.email,
      phone:selectedMentor.phone,
      course:selectedMentor.course,
      selectedemail,
     
    });
    
    seteditmentor(editmentor + 1)

    if (response.data) {
      const newcount = count + 1;
      setcount(count+ 1);
      setmentorEditModal(false)
      setSelectedMentor(newcount)

    }
  }catch (error) {
    console.error("Error toggling status", error);
    Swal.fire("Error!", "Failed to update status", "error");
  }
}  else if (result.isDenied) {
  Swal.fire("Changes are not saved", "", "info");
}
    });
  };

  const handleAddMentor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/creatementor", {
        name,
        email,
        phone,
        course,
        status,
        password,
      });
  
      setShowModal(false);
      setName("");
      setEmail("");
      setPhone("");
      setCourse("");
      setStatus("Active"); 
      fetchMentors();
  
      // ✅ SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Mentor Added!",
        text: "The mentor has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding mentor", error);
  
      // ❌ SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Failed to Add Mentor",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };
  

  return (
    <>
    <div className="flex flex-col min-h-screen bg-white drop-shadow-2xl overflow-hidden">
      <Header />
      <div className="flex flex-row w-full flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-violet-600 font-serif">Mentor List</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-violet-600 font-serif text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700 transition"
            >
              + Add Mentor
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0  bg-black/40  bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl w-[30%]">
                <form onSubmit={handleAddMentor}>
                  <h2 className="text-2xl font-bold font-serif text-center text-violet-600 f mb-6">Add Mentor</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                  <button
                      type="submit"
                      className="px-4 py-2 font-serif bg-violet-600 text-white rounded-md hover:bg-gray-400"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2  bg-gray-300 text-gray-700 rounded-md font-serif hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
          )}
        
        {/* Edit Modal */}
{editModal && selectedMentor && (
  <div className="fixed inset-0  bg-black/40  flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-[30%]">
      <form onSubmit={handleeditMentor}>
        <h2 className="text-2xl font-semibold text-center text-violet-600 mb-6">Edit Mentor</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={selectedMentor.name}
            onChange={(e) => setSelectedMentor({ ...selectedMentor, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={selectedMentor.email}
            onChange={(e) => setSelectedMentor({ ...selectedMentor, email: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={selectedMentor.phone}
            onChange={(e) => setSelectedMentor({ ...selectedMentor, phone: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={selectedMentor.course}
            onChange={(e) => setSelectedMentor({ ...selectedMentor, course: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
        <button
            type="submit"
            className="px-4 py-2 bg-violet-600 text-white rounded-md font-serif hover:bg-violet-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setmentorEditModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-serif hover:bg-gray-400"
          >
            Cancel
          </button>
          
        </div>
      </form>
    </div>
  </div>
)}

       
          {/* Mentor Table */}
          <div className="overflow-auto rounded-2xl shadow-md mt-4 max-h-[550px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-violet-600 text-white sticky top-0">
                <tr>
                  <th className="text-left px-8 py-3">No</th>
                  <th className="text-left px-8 py-3">Name</th>
                  <th className="text-left px-8 py-3">Email</th>
                  <th className="text-left px-8 py-3">Phone</th>
                  <th className="text-left px-8 py-3">Course</th>
                  <th className="text-left px-8 py-3">Status</th>
                  <th className="text-left px-28 py-3 ">Action</th>
                </tr>
              </thead>
              <tbody>
            {mentors.map((mentor, index) => (
                  <tr key={mentor._id} 
                  className="border-b hover:bg-gray-100 transform transition-all duration-500 hover:scale-99">
                    <td className="px-8 py-4">{index + 1}</td>
                    <td className="px-8 py-4">{mentor.name}</td>
                    <td className="px-8 py-4">{mentor.email}</td>
                    <td className="px-8 py-4">{mentor.phone}</td>
                    <td className="px-8 py-4">{mentor.course}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          mentor.active 
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {mentor.active   ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-20 py-4 flex gap-2">

                    <button onClick={() => {
                   
                   setmentorEditModal(true);
                   setSelectedMentor(mentor)
                   setselectedemail(mentor.email);
                 }} 

                   className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                  <button
                          onClick={() => handleMentorToggleStatus(mentor)}
                          className={`px-4 py-1 rounded-md text-sm transition ${
                            mentor.active
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                              
                          } text-white`}
                        >
                          {mentor.active ? "inActivate" : "Activate"}
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
    </>
  );
}

export default Mentorlist;
