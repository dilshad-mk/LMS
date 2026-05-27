"use client";
import { use, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
export default function Home() {

  // navbar toggler state
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen w-full flex flex-col items-center lg:px-40 px-10
        bg-[#020617]
        bg-[radial-gradient(circle_at_top_left,#172554,transparent_35%),radial-gradient(circle_at_top_right,#581c87,transparent_35%),radial-gradient(circle_at_bottom_left,#164e63,transparent_35%),radial-gradient(circle_at_bottom_right,#14533d,transparent_35%)]
      "
    >

      {/* nav bar  */}
      <nav className=" w-full flex items-center lg:justify-between justify-between gap-10 lg:gap-0 lg:p-4 p-2 bg-[#00000093] rounded-3xl mt-6 sticky top-4 z-50 ">
        {/* left side */}
        <div className="flex justify-center items-center gap-2">
          <img src="/favicon.ico" alt="LOGO" className="w-10" />
          <h1 className="text-sm font-bold text-white">Cyber Square <span className="font-light text-md text-neutral-600">/</span> <span className="text-[10px] text-neutral-600"> LMS</span></h1>
        </div>

        {/*  center */}
        <ul className=" gap-5 lg:flex hidden ">
          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Home</li>

          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Features</li>

          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Feedbacks</li>


          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Pricing</li>

          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">About</li>


        </ul>

        {/* right side */}
        <div className="hidden lg:flex gap-4">

          <Link href="/auth/login"><button className="text-sm text-neutral-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Sign in</button></Link>
          <Link href="/auth/register"><button className="text-sm text-white bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 px-3 py-2 rounded-2xl cursor-pointer hover:scale-[1.040] transition-all ease-in-out duration-300">Get Started</button></Link>

        </div>

        <button className="bg-black rounded-full w-fit p-2 lg:hidden cursor-pointer" onClick={() => setIsNavbarOpen(!isNavbarOpen)}> <Menu className="text-white w-6 h-6" /> </button>

        {/* mobile nav  */}
        <ul className={`flex flex-col gap-5 absolute top-full left-0 w-full bg-[#00000093] rounded-3xl mt-2 p-4 transition-all duration-300 ease-in-out ${isNavbarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Home</li>

          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Features</li>

          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Feedbacks</li>
          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Pricing</li>
          <li className="text-neutral-500 text-[13px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer">About</li>

          <Link href="/auth/register"><button className="text-sm text-white bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 px-3 py-2 rounded-2xl cursor-pointer hover:scale-[1.040] transition-all ease-in-out duration-300">Get Started</button></Link>

          <Link href="/auth/login"><button className="text-sm text-neutral-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Sign in</button></Link>

        </ul>



      </nav>


    </div>
  );
}