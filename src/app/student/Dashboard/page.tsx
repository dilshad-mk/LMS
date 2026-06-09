'use client';
import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Sidebar } from 'lucide-react';
import { UserProvider } from '../../context/StudentContext';
import MyCources from '../../components/student/MyCources';
import SideBar from '../../components/student/SideBar';
import Navbar from '../../components/student/Navbar';
import Ai from '../../components/student/Ai';
import Teachers from '../../components/student/Teachers';
import Progress from '../../components/student/Progress';

function page() {


    type Lesson = {
  _id: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

type Session = {
  _id: string;
  title: string;
  sessionOrder: number;
  lessons: Lesson[];
};

type FullCourse = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  sessions: Session[];
};
   type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
};

type Course = {
    _id : string,
    studentId : string,
    courseId : string,
    assaignedAt : Date
}
        // side bar toogler state -------------------
      const [sideBarOpen,setSideBarOpen] = useState(false);

    //   current componet toggler state 
    const [activePage, setActivePage] = useState("Courses")




    const [error,setError] = useState("");

    const router = useRouter();

 
    const [userData, setUserData] = useState<User | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);
   const [courseFullData, setCourseFullData] = useState<FullCourse | null>(null);
   const [selectedCourse, setSelectedCourse] = useState<FullCourse | null>(null);
const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    // getting user profile data ---
 const getUser = async () => {
                        // getting jwt token from localStorage
                const token =await localStorage.getItem("token");

                try{
                    const response = await axios.get("http://localhost:8080/api-protected/me", { 
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                        } 
                    );

                    setUserData(response.data.user);
                    setCourseData(response.data.courseData)

                }catch(error :any) {
                    router.push("/auth/login");
                    console.log(error)
                    setError (error.message?.data?.message || "something went wrong!");
                }



            };

// get course full data ________ 
const getCourseData = async (courseId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `http://localhost:8080/api-protected/getUserCourse/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    

    setCourseFullData(response.data);
  } catch (error: any) {
   

    setError(
      error.response?.data?.message || "Something went wrong"
    );
  }
};


        useEffect(() => {
  getUser();
}, []);

      useEffect(() => {
  if (courseData?.courseId) {
    getCourseData(courseData.courseId);
  }
}, [courseData]);
   


        // logout ----------------
        const logOut = () => {
            localStorage.removeItem("token");
            router.push("/auth/login");
        }

  return (
<div className='pt-19'>

   <UserProvider value={{userData, sideBarOpen,setSideBarOpen,activePage,setActivePage,courseFullData,selectedCourse, setSelectedCourse,selectedSession, setSelectedSession}}>
   <div>
    <Navbar/>
   </div>

    <div className={`flex transition-all duration-300 ${sideBarOpen ? 'lg:ml-60' : ''}`}>
        <SideBar/>
        <div className='w-full'>
            {activePage === "Courses" && <MyCources/>}
            {activePage === "Teachers" && <Teachers/>}
            {activePage === "Progress" && <Progress/>}
            {activePage === "AI" && <Ai/>}
        </div>
    </div>
    {/* <div className='flex  flex-col'>
        <MyCources />
        <Cources/>
    </div> */}
   </UserProvider>
</div>
  )
}

export default page