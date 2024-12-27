"use client";
import { signIn } from "next-auth/react";

type State = {
  status: number;
  message: string;
  errors: object;
  redirect: boolean;
};

export async function loginAction(prevState: State, formdata: FormData) {
  try {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      return {
        status: 401,
        message: result.error,
        errors: { email: "Invalid email or password." },
        data: {},
        redirect: false,
      };
    } else {
      return {
        status: 200,
        message: "Login successful",
        errors: {},
        data: {},
        redirect: true,
      };
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      status: 500,
      message: "An unexpected error occurred.",
      errors: {},
      data: {},
      redirect: false,
    };
  }
}
