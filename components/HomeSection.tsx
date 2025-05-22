"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const HomeSection = () => {

  const {data: session, status} = useSession();
  const router = useRouter();

  const handleClick = () =>{
    if(status == 'authenticated'){
      router.push('/resume')
    }
    else{
      router.push('/login')
    }
  }


  return (
    <div className=" h-[100vh] flex flex-col justify-center items-center p-4 md:p-10 shadow-2xl">
      <div className=' shadow-2xl p-20 py-30 rounded-2xl flex flex-col'>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black text-center ">
        AI Resume Generator
      </h1>
      <p className="text-base md:text-lg max-w-md md:max-w-xl text-center text-black p-4">
        Create ATS-friendly resumes in seconds using AI.
      </p>
        <button onClick={handleClick} className="mt-3 p-3 bg-blue-500 text-black rounded-3xl hover:bg-blue-600 transition cursor-pointer text-xl">
          Create your resume
        </button>
      </div>
      

    </div>
  )
}

export default HomeSection
