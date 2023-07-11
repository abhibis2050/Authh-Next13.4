"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const ProfilePage = () => {
  const router = useRouter()
  const [data,setData] =useState("nothing")
  const logout=async()=>{
    try {
      const response = await axios.get("/api/users/logout")
      console.log(response);
      if(response.status==200){
        toast.success(response.data.message)
        router.push("/login")
      }
      
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const getUserDetails = async()=>{
    const response = await  axios.get("/api/users/me")
    console.log(response?.data)
    setData(response.data.data._id)
  }

  return (
    <div>
        <h1>Profile</h1>
        <hr/>
        <p>Profile page</p>
      <h2>{data==="nothing"?"Nothing":
      <Link href={`/profile/${data}`}>
        {data}
      </Link>}</h2>
        <button className='border border-black bg-orange-500 py-2 px-4 my-4 ' onClick={getUserDetails}>Get User Details</button>
        <button className='border border-black bg-yellow-300 py-2 px-4 my-4 ' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage