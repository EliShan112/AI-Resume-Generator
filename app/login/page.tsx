'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/resume/form')
    return null
  }

  const handleSignIn = async () => {
    await signIn('google', { callbackUrl: '/resume/form' })
  }

  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink">
      {/* Animated blurred circles */}
      <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full top-0 -left-20 blur-3xl animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-white opacity-10 rounded-full bottom-0 -right-20 blur-3xl animate-pulse delay-200" />

      {/* Glass card */}
      <motion.div
        className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl px-10 py-12 md:px-16 w-[90%] max-w-md text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold mb-3 drop-shadow">Welcome Back!</h1>
        <p className="text-white/90 font-light mb-6 ">
          Sign in with Google to continue
        </p>

        <motion.button
          onClick={handleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-red-100 transition duration-300 cursor-pointer mx-auto"
        >
          <LogIn className="w-5 h-5 " />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Login
