"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/submitButton";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
    
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };

  const searchParams = useSearchParams();
  const router = useRouter()

  const [state, formAction] = useActionState(resetPasswordAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      router.replace("/login")
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="token"
        value={searchParams.get("token") ?? ""}
      />
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={searchParams.get("email") ?? ""}
          readOnly
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password..."
        />
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Confirm your password..."
        />
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}

export default ResetPasswordForm;
