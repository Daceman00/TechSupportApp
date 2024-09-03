import React from 'react'
import NavBar from "./NavBar"
import Form from './Form'
import Sidebar from './Sidebar'


function Dashboard() {
  return (
    <>
    <NavBar />
    <div className="flex h-screen">
      {/* Sidebar taking 30% of the screen width */}
      <div className="w-[25%]">
        <Sidebar />
      </div>

      {/* Form taking the remaining 70% of the screen width */}
      <div className="w-[75%]">
        <Form />
      </div>
    </div>
    </>
  )
}

export default Dashboard