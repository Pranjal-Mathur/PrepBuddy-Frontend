import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { isLoading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await handleRegister({
      username,
      email,
      password,
    });

    if (data) {
      navigate("/login");
    }
  };


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


      {/* Register Card */}

      <section className="mt-8 w-full max-w-md px-6">


        <h2 className="text-3xl font-bold mb-8">
          Register
        </h2>


        <form 
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          {/* Username */}

          <div>

            <label className="block mb-2 text-sm font-semibold">
              Username
            </label>

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
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



          {/* Email */}

          <div>

            <label className="block mb-2 text-sm font-semibold">
              Email
            </label>

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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

            <label className="block mb-2 text-sm font-semibold">
              Password
            </label>

            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
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
            disabled={isLoading}
            type="submit"
            className={`
            w-full
            rounded-xl
            py-3.5
            font-bold
            text-black
            transition
            ${
              isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-violet-500 hover:bg-violet-400"
            }
            `}
          >

            {isLoading ? "Registering..." : "Register"}

          </button>


        </form>



        <p className="mt-7 text-sm font-semibold">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            Login
          </Link>

        </p>


      </section>


    </main>
  );
};


export default Register;