'use client';
import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Sidebar } from 'lucide-react';
import { UserProvider } from '../../context/UserContext';
import MyCources from '../../components/student/MyCources';
import Cources from '../../components/student/Cources';


function page() {

    const [error,setError] = useState("");

    const router = useRouter();

    type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
};
    const [userData, setUserData] = useState<User | null>(null);

        useEffect (() => {
            const getUser = async () => {
                        // getting jwt token from localStorage
                const token = localStorage.getItem("token");

                try{
                    const response = await axios.get("http://localhost:8080/api-protected/me", { 
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                        } 
                    );

                    setUserData(response.data)

                }catch(error :any) {
                    router.push("/auth/login");
                    console.log(error)
                    setError (error.message?.data?.message || "something went wrong!");
                }



            };

            getUser();

        },[])

        const logOut = () => {
            localStorage.removeItem("token");
            router.push("/auth/login");
        }

  return (
<div>
   {/* <button onClick={ ()=>{console.log(userData.username)}}>click</button> */}
   <p>Name : {userData?.username}</p>
   <p>eamil : {userData?.email}</p>
   <p>role : {userData?.role}</p>
   <button onClick={logOut} className='w-[100px] bg-red-600 p-2 rounded-2xl cursor-pointer hover:bg-red-50 '>Lgout</button>

   <UserProvider value={userData}>
    <Sidebar/>
    <div className='flex  flex-col'>
        <MyCources />
        <Cources/>
    </div>
   </UserProvider>
</div>
  )
}

export default page