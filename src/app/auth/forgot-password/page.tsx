"use client";
import React from 'react'

import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation';

function page() {

const router =  useRouter();
  // temperory form on submit handler function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    // navigation ...
    router.push('/auth/verify-email')
      
    // handle form submission logic here, such as validating input, sending data to the server, etc.
  }
  return (
    <div className='flex  justify-between items-center md:px-30 py-5 gap-3 w-full h-full '>
  
     {/* left side - login form */}
 <div className='w-full h-full '>


{/* form goes here/  */}
      <form action="" onSubmit={handleSubmit} className='w-full gap-5'>
     {/* hadding and subheading for the form  */} 
     <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-[30px]'>Forgot Password?</h1>
      <p className='text-neutral-500'>Please enter your email address to get conformation code</p>
    </div>

        <label htmlFor="email" className='text-neutral-500 flex flex-col gap-5 font-semibold mt-4'>Email address
          <input type="email" id="email" placeholder='you@gmail.com' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#407cff]' required />
        </label>

        <button type='submit' className='w-full bg-[#407cff] text-white py-2 rounded-lg hover:bg-[#407cffb7] text-bold transition-colors duration-300 mt-4'>
          Send Confirmation Code
        </button>

        {/* back to login page link */}
        <div className='text-center mt-4'>
          <p  className='text-neutral-500 '>
              <FaArrowLeft className='inline-block mr-1' />
            Back to  <a href='/auth/login' className='text-[#407cff] hover:underline'>Login</a>
          </p>
        </div>
      </form>

 </div>

      {/* right side - image container  */} 
        <div className='w-full h-full bg-[]'>
          <img src="/Forgot password-rafiki.svg" alt="login" className='w-full h-full object-cover' />
         
         </div>


    </div>
  )
}

export default page