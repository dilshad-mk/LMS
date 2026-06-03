"use client";
import React, { useState } from 'react'

import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import axios, { Axios } from 'axios';
import {FaExclamationTriangle } from "react-icons/fa";
import { motion } from 'motion/react';


function page() {

const router =  useRouter();

// form data -------------
    const [email, setEmail] = useState("");
// error ------------------------
const [error,setError] = useState("");

// email send indication --------------
const [isOtpSend, setIsOtpSend] = useState("Send OTP")

    // onchange form data 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      setEmail(e.target.value);
        setError('')
    }

  // temperory form on submit handler function
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    
    e.preventDefault();
    try {
      setIsOtpSend("OTP sending...");

      const response = await axios.post("http://localhost:8080/api/forgot", {email : email});
    
        setIsOtpSend("otp send successfully")

        localStorage.setItem("resetToken", response.data.resetToken);


        localStorage.setItem("email", email);
      // navigation ...
      router.push('/auth/verify-email');
    }
   
    catch(error : any) {
      console.log(error);
      setError(error.response?.data?.message);

        setIsOtpSend("Send OTP")
    }

    // handle form submission logic here, such as validating input, sending data to the server, etc.
  }
  return (
    <div className='flex  justify-between items-center md:px-30 py-5 gap-3 w-full h-full px-3'>
  
     {/* left side - login form */}
 <div className='w-full h-full '>


{/* form goes here/  */}
      <form action="" onSubmit={handleSubmit} className='w-full gap-5'>

 {/* error message */}
        {error && (
          <motion.div

            initial={{
              opacity: 0,
              y: -15,
              scale: 0.95
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: -15,
              scale: 0.95
            }}

            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}

            className='bg-red-50 border border-red-200 text-red-500
    w-fit px-5 py-3 rounded-2xl flex gap-3
    justify-center items-center shadow-sm'
          >

            <FaExclamationTriangle className='text-red-500 text-lg' />

            <p className='text-sm font-medium'>
              {error}
            </p>

          </motion.div>
        )}

     {/* hadding and subheading for the form  */} 
     <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-[30px]'>Forgot Password?</h1>
      <p className='text-neutral-500'>Please enter your email address to get conformation code</p>
    </div>

        <label htmlFor="email" className='text-neutral-500 flex flex-col gap-5 font-semibold mt-4'>Email address
          <input type="email" id="email" placeholder='you@gmail.com' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#407cff]' required value={email}  onChange={handleChange}/>
        </label>

        <button type='submit' className='w-full bg-[#407cff] text-white py-2 rounded-lg hover:bg-[#407cffb7] text-bold transition-colors duration-300 mt-4'>
         {error ? "Send OTP" : `${isOtpSend}`}
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
        <div className='w-full h-full hidden md:flex'>
          <img src="/Forgot password-rafiki.svg" alt="login" className='w-full h-full object-cover' />
         
         </div>


    </div>
  )
}

export default page