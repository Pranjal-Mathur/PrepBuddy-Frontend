import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const { isLoading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({
      email,
      password
    });

    navigate("/");
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-white">
        <h1 className="text-2xl font-semibold animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center">


      {/* Logo */}

      <div className="mt-6 text-center">

        <h1 className="text-4xl font-extrabold text-emerald-400 tracking-tight">
          PrepBuddy
        </h1>

        <p className="text-xs tracking-widest text-cyan-300 mt-1">
          MASTER YOUR PREPARATION
        </p>

      </div>



      {/* Login Card */}

      <section className="mt-8 w-full max-w-md px-6">


        <h2 className="text-3xl font-bold mb-8">
          Login
        </h2>



        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >


          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold"
            >
              Email
            </label>


            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              className="
              w-full
              bg-white
              text-black
              rounded-xl
              px-5
              py-3.5
              outline-none
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-cyan-400
              "
            />

          </div>




          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold"
            >
              Password
            </label>


            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="
              w-full
              bg-white
              text-black
              rounded-xl
              px-5
              py-3.5
              outline-none
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-cyan-400
              "
            />

          </div>




          {/* Button */}

          <button
            type="submit"
            className="
            w-full
            rounded-xl
            bg-emerald-500
            py-3.5
            font-bold
            text-black
            transition
            hover:bg-emerald-400
            focus:ring-4
            focus:ring-emerald-300
            "
          >

            Sign in

          </button>


        </form>




        <p className="mt-7 text-sm font-semibold">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            Register
          </Link>

        </p>



      </section>


    </main>
  );
};

export default Login;