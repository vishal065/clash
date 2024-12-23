"use server";
import { Register_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

type State = {
  status: number;
  message: string;
  errors: object;
};

export async function registerAction(prevState: State, formdata: FormData) {
  try {
    const { data } = await axios.post(Register_URL, {
      name: formdata.get("name"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirm_password"),
    });
    console.log("data is ", data);

    return {
      status: 200,
      message: data?.message ?? "Account created successfully",
      errors: {},
    };
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
    }
    return {
      status: 500,
      message: "something went wrong",
      errors: {},
    };
  }
}
