import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

function login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white/70 rounded-xl  px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          Clash
        </h1>
        <h2 className="text-3xl font-bold   ">Reset Password</h2>

        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default login;
