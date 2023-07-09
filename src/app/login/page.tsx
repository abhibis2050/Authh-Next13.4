"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios  from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/login`,user);
      console.log(response);
      if(response.status===201){
        toast.success(response.data.message)
        router.push('/profile')
      }
      
    } catch (error: any) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"processing":"Login"} </h1>
      <hr />
      <label htmlFor="email">email </label>
      <input
        className="p-2 border border-black rounded-lg"
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
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <button
        className="py-2 px-5 border border-black rounded-lg my-2 focus:outline-none"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup">Visit SignUp Page</Link>
    </div>
  );
};

export default Login;
