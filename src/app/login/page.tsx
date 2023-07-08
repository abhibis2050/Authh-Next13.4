"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login </h1>
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
