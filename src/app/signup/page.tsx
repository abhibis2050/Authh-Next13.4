"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import  axios  from "axios";

const SignUp = () => {  
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false)
const [loading,setLoading] = useState(false)
  const onSignup = async () => {
try { 
  setLoading(true)
  const response = await axios.post("/api/users/signup",user)
  console.log("response",response.data);
  router.push("/login")
  
} catch (error:any) {
   toast.error(error.message)
}finally{

}
  };


  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0&&user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"Processing":"Signup"} </h1>
      <hr />
      <label htmlFor="username">Username </label>
      <input
        className="p-2 border border-black rounded-lg"
        placeholder="Enter Username"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />

      <label htmlFor="email">email </label>
      <input
        className="p-2 border border-black rounded-lg"
        placeholder="Enter Email"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />

      <label htmlFor="password">password </label>
      <input
        className="p-2 border border-black rounded-lg"
        placeholder="Enter Password"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <button
        className="py-2 px-5 border border-black rounded-lg my-2 focus:outline-none"
        onClick={onSignup}
      >
       {buttonDisabled?"No Sign Up":"Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default SignUp;
