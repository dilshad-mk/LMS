"use client";
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react'; 

function page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (password.length < 8) {
    //   alert('Password must be at least 8 characters');
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }
    setLoading(true);

  try {

    // fake api delay
    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    router.push("/auth/login");

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
    console.log('Password reset:', password);
    // setIsPwdReset(true);
      // logic need to add 
  };

  return (
    <div className='flex items-center justify-center min-h-screen md:px-30 w-full px-3 relative'>

       
      <div
       
      className='w-full h-full flex items-center'>

          <form
        
  
          onSubmit={handleSubmit} className='w-full h-full  bg-white p-6 rounded-lg shadow md:shadow-none  flex flex-col gap-5 flex-1'>

        <div className='mb-4'>
          <h1 className='text-2xl font-bold'>Enter new password</h1>
          <p className='text-sm text-gray-500'>This password should be different from previous password</p>
        </div>

        <label className='flex flex-col text-gray-700 mb-4'>New Password
          <div className='relative'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your new password'
              minLength={8}
              autoComplete='new-password'
              className='w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
            <button
              type='button'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className='absolute right-3 top-3 text-gray-500'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          </div>
        </label>

        <label className='flex flex-col text-gray-700 mb-4'>Confirm Password
          <div className='relative'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your new password'
              autoComplete='new-password'
              className='w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
            <button
              type='button'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className='absolute right-3 top-3 text-gray-500'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          </div>
        </label>

        <button type='submit' className='w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-400 transition-all duration-300 ease-in-out'>Reset Password</button>
      </form>

   <motion.div
   animate={{
    opacity: loading ? 1:0
   }}
   transition={{ease:"easeInOut", duration:.3}}

   className={`absolute w-screen h-screen bg-[#0000008a] backdrop-blur-xl left-0 flex items-center justify-center ${loading ? 'pointer-events-auto' : 'pointer-events-none'}`}>
       <div  className="
      
          w-10 h-10
          border-4 border-yellow-500
          border-t-transparent
          rounded-full
          animate-spin
">
      </div>
   </motion.div>


{/* right side image container --------------- */}
      <div className='h-full w-full hidden md:flex flex-1'>
        <img src="/reset-password-animate.svg" alt="img not loaded"  className='w-full h-full'/>
      </div>
      </div>
    </div>
  );
}

export default page;