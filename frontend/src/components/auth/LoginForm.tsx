"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../common/submitButton";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/loginAction";
import { toast } from "sonner";

function LoginForm() {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };

  const [state, formAction] = useActionState(loginAction, initialState);
  console.log("state is-", state.data);

  useEffect(() => {
    console.log("login form", state);
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
        />
        {/* <span className="text-red-500">{state.errors?.email}</span> */}
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password..."
        />
        {/* <span className="text-red-500">{state.errors?.password}</span> */}
      </div>
      <div className="text-right font-bold">
        <Link href={`forget-password`}>Forget Password ?</Link>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}

export default LoginForm;
