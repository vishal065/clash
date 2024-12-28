import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl  px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          Clash
        </h1>
        <h2 className="text-3xl font-bold">Register</h2>
        <p>welcome to Clash</p>
        <RegisterForm />

        <p className="text-center mt-2">
          Already have an account ?{" "}
          <strong>
            <Link href={`/login`}>Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default register;
