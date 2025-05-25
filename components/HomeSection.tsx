"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const HomeSection = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/resume/form")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden">

      {/* Animated gradient circles */}
      <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full top-0 -left-20 blur-3xl animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-white opacity-10 rounded-full bottom-0 -right-20 blur-3xl animate-pulse delay-200"></div>

      <motion.div
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 md:p-16 w-[90%] max-w-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          AI Resume Generator
        </h1>
        <p className="text-md md:text-lg text-white/90 mb-6 font-light">
          Instantly create professional, ATS-friendly resumes using the power of AI.
        </p>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-700 font-semibold cursor-pointer px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition duration-300"
        >
          Create Your Resume
        </motion.button>
      </motion.div>
    </div>
  )
}

export default HomeSection
