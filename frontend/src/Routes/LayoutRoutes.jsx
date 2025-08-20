import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Adminlogin from '../components/Adminlogin'
import Admindashboard from '../components/Admindashboard'
import Studentslist from '../components/Studentslist'
import Mentorlist from '../components/Mentorlist'
import Courselist from '../components/Courselist'
import Attendancelist from '../components/Attendancelist'
function LayoutRoutes() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/adminlogin" element={<Adminlogin/>} />
      <Route path="/admindashboard" element={<Admindashboard/>} />
      <Route path='/studentslist' element={<Studentslist/>}/>
      <Route path='/mentorlist' element={<Mentorlist/>}/>
      <Route path='/courselist' element={<Courselist/>}/>
      <Route path='attendancelist'element={<Attendancelist/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default LayoutRoutes

