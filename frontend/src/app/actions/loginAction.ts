"use client";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type State = {
  status: number;
  message: string;
  errors: object;
};

export async function loginAction(prevState: State, formdata: FormData) {
  try {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      toast.error(result.error);
      return {
        status: 401,
        message: result.error,
        errors: {},
        data: {},
      };
    } else {
      return {
        status: 200,
        message: "Login in progress",
        errors: {},
        data: {},
      };
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    toast.error("An unexpected error occurred.");
    return {
      status: 500,
      message: "An unexpected error occurred.",
      errors: {},
      data: {},
    };
  }
}
