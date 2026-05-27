"use client";
import React from 'react'

import axios from "axios"

import { easeInOut, motion } from 'motion/react';

import { useRouter } from 'next/navigation';

// icon importing from react lucid 
import { GraduationCap ,Eye,EyeOff,Presentation} from "lucide-react";


// icons inported from react icon 
import { FcGoogle } from 'react-icons/fc';
import { FaGithub,FaExclamationTriangle  } from "react-icons/fa";

import { useState } from 'react';



function page() {
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student"
});

// error message state 
const [error, setError] = useState("");

const router = useRouter();

      // sign in option toggler state
    // const [signInOption, setSignInOption] = React.useState<"student" | "teacher" | string>("student");

    // password visibility toggler state
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    
    // submit ----api etc
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  setError("");
   // confirm password validation
  if(formData.password !== formData.confirmPassword){
    setError("Passwords do not match!");
    return;
  }

    try{


      const response = await axios.post("http://localhost:8080/api/signup",   
        {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
    });
      
       

      alert("sign up finished");

      setFormData({
        username:"",
        email: "",
        role:"student",
        password:"",
        confirmPassword:""

      });
    
      // naviagtion to login 
      router.push("/auth/login")

    }
    catch(error : any){
      console.log(error)
      setError(error.response?.data?.message || "something went wrong!")
      
    }
 
};


  return (
 <div className='flex items-center justify-between gap-3 w-full h-full md:px-25  py-5 px-3 '>



     {/* left side - login form  */}
     <form action="" onSubmit={handleSubmit} className=' px-7 py-5 flex flex-col gap-3 rounded-2xl md:w-[50%] w-fit transition-all ease-in-out duration-300 flex-1 h-[100%] ' >

          
{/* error message  goes here----------------*/}
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
      ease: easeInOut
    }}

    className='bg-red-50 border border-red-200 text-red-500
    w-fit px-5 py-3 rounded-2xl flex gap-3
    justify-center items-center shadow-sm'
  >

    <FaExclamationTriangle className='text-red-500 text-lg'/>

    <p className='text-sm font-medium'>
      {error}
    </p>

  </motion.div>
)}
 
         {/* heading and subheading for the form  */}
       <div className='flex flex-col gap-3'>
           <h1 className='text-[40px] font-bold text-black'>Create Account</h1>
         <p className='text-sm text-neutral-500 font-semibold'>Sign up to continue your learning journey.</p>

         {/* signu as ---- (teacher or student-) */}
         <div className='flex items-center gap-3'>

          <button
            type='button'
           onClick={() =>
  setFormData({ ...formData, role: "student" })
}
            className={`${formData.role === 'student' ? 'bg-[#ff715e] text-white' : 'border border-[#ff715e7b] text-[#333]'} flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-200`}
          >
            <GraduationCap className={formData.role === 'student' ? 'text-white' : 'text-[#ff715e]'} />
            <p className='text-[10px] font-semibold'>Student</p>
            <p className='text-[8px]'>Learn & Grow</p>
          </button>

          <button
            type='button'
          onClick={() =>
  setFormData({ ...formData, role: "teacher" })
}
            className={`${formData.role === 'teacher' ? 'bg-[#ff715e] text-white' : 'border border-[#ff715e7b] text-[#333]'} flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-200`}
          >
            <Presentation className={formData.role === 'teacher' ? 'text-white' : 'text-[#ff715e]'} />
            <p className='text-[10px] font-semibold'>Teacher</p>
            <p className='text-[8px]'>Teach & Inspire</p>
          </button>

         </div>

       </div>
 
       {/* login input fields */}

       <label htmlFor="name" className='text-neutral-500 flex flex-col gap-2'>Full Name
       <input type="text" id="name" placeholder='Enter your name'
       value={formData.username}
       onChange={(e) => setFormData({...formData,username:e.target.value})}
       className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff715e]' required />
         </label>
 
       <label htmlFor="email" className='text-neutral-500 flex flex-col gap-2'>Email address
       <input type="email" id="email" placeholder='you@gmail.com'
        value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
       className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff715e]' required />
         </label>
 
       <label htmlFor="password" className='text-neutral-500 flex flex-col gap-2'>Password
       <div className='relative'>
         <input type={isPasswordVisible ? "text" : "password"} id="password" placeholder='Enter your password'
           value={formData.password}
  onChange={(e) =>
    setFormData({ ...formData, password: e.target.value })
  }
         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff715e]' required />
         
         <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-3 top-3 text-gray-500'>
           {isPasswordVisible ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
         </button>
       </div>
       </label>
 
       <label htmlFor="confirmPassword" className='text-neutral-500 flex flex-col gap-2'>Confirm Password
       <div className='relative'>
         <input type={isPasswordVisible ? "text" : "password"} id="confirmPassword" placeholder='Confirm your password' 
             value={formData.confirmPassword}
  onChange={(e) =>
    setFormData({ ...formData, confirmPassword: e.target.value })
  }
         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff715e]' required />
         
         <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-3 top-3 text-gray-500'>
           {isPasswordVisible ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
         </button>
       </div>
       </label>
 
       {/* terms and conditions */}
       <div className='flex items-center justify-between'>
         <div className='flex items-center'>
           <input type="checkbox" id="terms" className='w-4 h-4 accent-[#ff715e] border-gray-300 rounded text-white' />
           <label htmlFor="terms" className='ml-2 text-sm text-neutral-500'>I agree to the <span className='text-[#ff715e] hover:underline'>Terms of Service</span> and <span className='text-[#ff715e] hover:underline'>Privacy Policy</span></label>
         </div>
       </div>
 
       {/* sign in button */}
         <button type='submit' className='w-full bg-[#ff715e] text-white py-2 rounded-lg hover:bg-[#ff715eb9] text-bold transition-colors duration-300'>Sign Up</button>
 
         {/* google and github sign in options */}
 
         <span className=' text-center text-neutral-500'>Or continue with</span>
 
         <div className='flex items-center justify-center gap-4'>
             <button type='button' className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-bold'>
                 <FcGoogle className='w-5 h-5 ' />
                 Google
             </button>
             <button type='button' className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-bold'>
                 <FaGithub className='w-5 h-5 text-gray-800' />
                 GitHub
             </button>
         </div>
 
         {/* sign in redirection link */}
 
         <div className='text-center mt-4'>
             <p className='text-sm text-neutral-500'>
                 Already have an account?{' '}
                 <a href="/auth/login" className='text-[#ff715e] hover:underline font-bold'>
                     Sign in
                 </a>
             </p>
         </div>
       </form>
 
     
     {/* rignt side - svg image with animation  */}
    <div className=" md:flex hidden md:justify-center md:items-center w-full h-full flex-1 bg-[#ff715e6d] rounded-3xl">
     <img src="/signUp.svg" alt="Svg not loaded"  className='w-full h-full'/>
    </div>
      
    </div>
  )
}

export default page