import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white/70 rounded-xl  px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          Clash
        </h1>
        <h2 className="text-3xl font-bold   ">Login</h2>
        <p>welcome back</p>
        <LoginForm />
        <p className="text-center mt-2">
          Dont have an account ?{" "}
          <strong>
            <Link href={`/register`}>Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default login;
