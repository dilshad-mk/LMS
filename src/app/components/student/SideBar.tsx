import React, { useState } from 'react'
import { FaBookOpen, FaChalkboardTeacher ,FaChartLine   } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { useUser } from '../../context/StudentContext';
import { IoSettingsSharp,IoLogOut,IoClose  } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { motion,AnimatePresence } from 'motion/react';

function Sidebar() {
  
const {sideBarOpen, activePage,setActivePage} = useUser();


  return (
  <div className={`fixed top-19 left-0 bottom-0 h-[calc(100vh-3.5rem)] bg-[#425080] overflow-hidden transition-all duration-300 ${sideBarOpen ? "w-60" : "w-0"}`}>
<AnimatePresence>
{
  sideBarOpen && (
       <motion.div
    
    initial = {{
      x:-170 ,
      opacity : .5
    }}
   
    animate ={{
        x: sideBarOpen ? 0 : -170,
        opacity : sideBarOpen ? 1 : 0
    }}
     exit={{
      x :sideBarOpen ? -170 : 0,
      opacity : sideBarOpen ? 1 :0
    }}
    
    transition={{duration : .3 , ease : "easeInOut"}}

    className={`bg-[#425080] flex flex-col gap-10 h-full px-6 py-4 ${sideBarOpen ? "w-60" : "w-0"}`}>

      
      {/* logo ---- */}
      <div>
        <p className='text-3xl font-bold leading-6 text-white'>LMS</p>
      <p className='text-[10px] font-semibold text-green-800 text-white'>Online Learnig platform</p>
      </div>

      

      {/* menu ----- */}
     <div className='flex flex-col gap-5'>
         <span className='text-white'>MENU</span>
      <div className='flex flex-col gap-4'>
        <p className={`flex gap-5 hover:text-white ease-in-out transition-colors duration-300 cursor-pointer ${activePage === "Courses" ? "text-[#ffff]" : " text-[#abacae]"} relative`}  onClick={() => {setActivePage("Courses")}}><span className={` bg-white w-[10px] rounded-tr rounded-br relative z-50 left-[-23px] ${activePage === "Courses" ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out duration-300`}></span> <FaBookOpen size={22} /> My Course</p>
        <p className={`flex gap-5 hover:text-white ease-in-out transition-colors duration-300 cursor-pointer ${activePage === "Teachers" ? "text-[#ffff]" : " text-[#abacae]"} relative`}  onClick={() => {setActivePage("Teachers")}}><span className={` bg-white w-[10px] rounded-tr rounded-br relative z-50 left-[-23px] ${activePage === "Teachers" ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out duration-300`}></span> <FaChalkboardTeacher size={22}/> Teachers</p>
        <p className={`flex gap-5 hover:text-white ease-in-out transition-colors duration-300 cursor-pointer ${activePage === "Progress" ? "text-[#ffff]" : " text-[#abacae]"} relative`}  onClick={() => {setActivePage("Progress")}}><span className={` bg-white w-[10px] rounded-tr rounded-br relative z-50 left-[-23px] ${activePage === "Progress" ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out duration-300`}></span> <FaChartLine  size={22}/> Progress</p>
        <p className={`flex gap-5 hover:text-white ease-in-out transition-colors duration-300 cursor-pointer ${activePage === "AI" ? "text-[#ffff]" : " text-[#abacae]"} relative`}  onClick={() => {setActivePage("AI")}}><span className={` bg-white w-[10px] rounded-tr rounded-br relative z-50 left-[-23px] ${activePage === "AI" ? "opacity-100" : "opacity-0"}`}></span> <BsRobot  size={22}/> AI Chat</p>
      </div>

     </div>

      {/* general ------ */}
      <div className='flex flex-col gap-5'>
        <span className='text-white'>GENERAL</span>
      <div className='flex flex-col gap-4'>
      <p className={`flex gap-5 text-white`}><IoSettingsSharp size={22}/> Settings</p>
      <p className={`flex gap-5 text-white`}><FaCircleQuestion size={22}/>Help</p>
      <p className={`flex gap-5 text-white hover:text-red-600 cursor-pointer transition-colors ease-in-out duration-300`} ><IoLogOut size={22}/> Logout</p>
      </div>
      </div>

    </motion.div>
  )
}
</AnimatePresence>

  </div>
  )
}

export default Sidebar