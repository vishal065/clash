"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../common/submitButton";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/loginAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function LoginForm() {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
    redirect: false,
  };

  const [state, formAction] = useActionState(loginAction, initialState);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    if (state.status === 500 || state.status === 401) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      if (state.redirect) {
        router.push("/dashboard");
      }
    }
  }, [state, router]);

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
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password..."
        />
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
