import React from 'react'
import Form from '@/components/Form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

const Page = async () => {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/login')
  }
  return (
    <>
    <Form/>
    </>
  )
}

export default Page