// "use-client();"
"use client";

import React from 'react'
// icon importing from react lucid 
import {  Eye,EyeOff} from "lucide-react";

// icons inported from react icon 
import { FaGithub,  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useState } from 'react';

function page() {

    // sign in option toggler state
    const [signInOption, setSignInOption] = React.useState<"student" | "teacher" | "admin" | string>("student");

    // password visibility toggler state
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // form on submit handler temperary function
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");

        // handle form submission logic here, such as validating input, sending data to the server, etc.
    }

  return (
   <div className='flex items-center justify-between gap-3 w-full h-full md:px-25  py-5 px-3 '>

    {/* left side - login form  */}
    <form action="" onSubmit={handleSubmit} className=' px-7 py-5 flex flex-col gap-7 rounded-2xl md:w-[50%] w-fit transition-all ease-in-out duration-300 flex-1 h-full ' >

        {/* heading and subheading for the form  */}
      <div className='flex flex-col gap-2'>
          <h1 className='text-[40px] font-bold text-black'>Welcome back!</h1>
        <p className='text-sm text-neutral-500 font-semibold'>Sign in to continue your learning journey.</p>
      </div>

      {/* login input fields */}
      <label htmlFor="email" className='text-neutral-500 flex flex-col gap-2'>Email address
      <input type="email" id="email" placeholder='you@gmail.com' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#407cff]' required />
        </label>

      <label htmlFor="password" className='text-neutral-500 flex flex-col gap-2'>Password
      <div className='relative'>
        <input type={isPasswordVisible ? "text" : "password"} id="password" placeholder='Enter your password' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#407cff]' required />
        
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-3 top-3 text-gray-500'>
          {isPasswordVisible ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
        </button>
      </div>
      </label>

      {/* remember me and forgot password options */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input type="checkbox" id="remember" className='w-4 h-4 accent-[#407cff] border-gray-300 rounded' />
          <label htmlFor="remember" className='ml-2 text-sm text-neutral-500'>Remember me</label>
        </div>
        <a href="/auth/forgot-password" className='text-sm text-[#407cff] hover:underline'>Forgot password?</a>
      </div>

      {/* sign in button */}
        <button type='submit' className='w-full bg-[#407cff] text-white py-2 rounded-lg hover:bg-[#407cffcc] text-bold transition-colors duration-300'>Sign In</button>

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

        {/* sign up redirection link */}

        <div className='text-center mt-4'>
            <p className='text-sm text-neutral-500'>
                Don't have an account?{' '}
                <a href="/auth/register" className='text-[#407cff] hover:underline font-bold'>
                    Sign up
                </a>
            </p>
        </div>
      </form>

    
    {/* rignt side - svg image with animation  */}
   <div className=" md:flex hidden md:justify-center md:items-center w-full h-full flex-1 bg-[#8cb0ff5e] rounded-3xl">
    <img src="/Fingerprint-rafiki.svg" alt="Svg not loaded"  className='w-full h-full'/>
   </div>
     
   </div>
  )
}

export default page     