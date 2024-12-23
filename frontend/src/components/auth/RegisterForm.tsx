"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common/submitButton";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

function RegisterForm() {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(registerAction, initialState);
  console.log(state);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }

    return () => {};
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name..."
        />
        <span className="text-red-500">{state.errors?.name}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
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

export default RegisterForm;
