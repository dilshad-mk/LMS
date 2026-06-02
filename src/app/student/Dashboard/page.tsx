'use client';
import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


function page() {

    const [error,setError] = useState("");

    const router = useRouter();

        useEffect (() => {
            const getUser = async () => {
                        // getting jwt token from localStorage
                const token = localStorage.getItem("token");

                try{
                    const response = await axios.get("http://localhost:8080/api/dashboard/me", { 
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                        } 
                    );

                    console.log(response.data)

                }catch(error :any) {
                    router.push("/auth/login");
                    console.log(error)
                    setError (error.message?.data?.message || "something went wrong!");
                }



            };

            getUser();

        },[])

  return (
    <div>Student Dashbord</div>
  )
}

export default page