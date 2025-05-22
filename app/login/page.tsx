'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
    
    const {data: session} = useSession();
    const router = useRouter();

    if(session){
        router.push('/resume/form')
        return null;
    }

    const handleSignIn = async() =>{
        await signIn('google', {callbackUrl: '/resume/form'})
    }


  return (
    <>
    <div className="flex items-center justify-center flex-grow bg-white">
      <div className=" text-black p-12 md:p-30 rounded-lg shadow-2xl shadow-black flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <p className="mb-6 text-center">Sign in with Google to continue</p>
        <button
          onClick={handleSignIn}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    </div>
    </>
  )
}

export default Login