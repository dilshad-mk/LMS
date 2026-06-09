import React from 'react'
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useUser } from '../../context/StudentContext';
function Navbar() {

    const {sideBarOpen,setSideBarOpen,userData} = useUser();
  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
            <nav className='bg-[#ffff] flex items-center justify-between h-19 px-7 border-b border-neutral-300 shadow-sm w-full'>
<div className='flex gap-[30px]'>
            <button onClick={() => {setSideBarOpen(!sideBarOpen)}} className='cursor-pointer'>{sideBarOpen ? (<IoClose size={26}/>) : (<HiMenu size={26}/>)} </button>

            <h1 className='text-[30px] font-mono text-[#201b3b]'>Hello, {userData?.username}!</h1>
</div>

{/* profile  */}
<div className='flex gap-2 flex-row-reverse'>
    <span className='bg-[#227d52] flex justify-center items-center w-10 h-10 rounded-full text-[20px] text-white '>{userData?.username?.charAt(0).toUpperCase()}</span>
  <div className='flex flex-col'>
      <p className='text-neutral-800 text-xs'>{userData?.username}</p>
    <p className='text-neutral-500 text-xs'>{userData?.email}</p>
  </div>
</div>


            </nav>
    </div>
  )
}

export default Navbar