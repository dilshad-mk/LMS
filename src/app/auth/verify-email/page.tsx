"use client";
import React, { useEffect, useState } from 'react'
import { OTPInput, SlotProps } from 'input-otp';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Slot(props: SlotProps) {
  return (
    <div
      className={`
        w-12 h-12
        flex items-center justify-center
        border-2 border-gray-300 rounded-lg
        text-2xl font-semibold
        bg-white
        focus-within:border-blue-500 focus-within:outline-none
        ${props.isActive ? 'border-yellow-500 ring-2 ring-yellow-200' : ''}
        ${props.char ? 'border-gray-400' : 'border-gray-300'}
      `}
    >
      {props.char}
    </div>
  );
}

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const [email,setEmail] = useState("")
const [error, setError] = useState("") 

useEffect(() => {
  const storedEmail = localStorage.getItem("email");

  if (!storedEmail) {
    router.push("/auth/forgot-password");
    return;
  }

  setEmail(storedEmail);
}, []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      console.log('OTP submitted:', otp);
      //  verification logic here
      try{
        const response = await axios.post("http://localhost:8080/api/pswdOtp", {
          email,
          otp
        })

        router.push('/auth/reset-password')
        localStorage.removeItem("email")
      }
      catch(error :any){
      setError(error.response?.data?.message)
      
    }

    }
  };

  return (
    <div
      className="
        relative flex items-center justify-center
        min-h-screen
        bg-[url('/Authentication.svg')]
        bg-cover bg-center bg-no-repeat
      "
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md p-8 bg-white backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/70">
        <h1 className="text-2xl font-bold text-center mb-2">Verify Email</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <OTPInput
              maxLength={6}
              value={otp}
              onChange={(value: string) => setOtp(value.replace(/\D/g, ''))}
              containerClassName="flex gap-2"
              render={({ slots }) => (
                <div className="flex gap-3">
                  {slots.map((slot, index) => (
                    <Slot key={index} {...slot} />
                  ))}
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6}
            className={`
              w-full py-2 px-4 rounded-lg font-semibold
              transition-colors duration-200
              ${
                otp.length === 6
                  ? 'bg-yellow-500 text-white hover:bg-yellow-500'
                  : 'bg-yellow-100 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {error ? error : "Verify"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the code?{' '}
          <button className="text-yellow-500 hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail