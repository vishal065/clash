"use server";
import {
  CHECK_CREDENTIALS_URL,
  FORGET_PASSWORD_URL,
  Register_URL,
  RESET_PASSWORD_URL,
} from "@/lib/apiEndPoints";
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
export async function loginAction(prevState: State, formdata: FormData) {
  try {
    const { data } = await axios.post(CHECK_CREDENTIALS_URL, {
      email: formdata.get("email"),
      password: formdata.get("password"),
    });

    return {
      status: 200,
      message: data?.message ?? "Login successfully",
      errors: {},
      data: {
        email: formdata.get("email"),
        password: formdata.get("password"),
      },
    };
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
          data: {},
        };
      }
    }
    return {
      status: 500,
      message: "something went wrong",
      errors: {},
      data: {},
    };
  }
}

export async function forgetPasswordAction(
  prevState: State,
  formdata: FormData
) {
  try {
    const data = await axios.post(FORGET_PASSWORD_URL, {
      email: formdata.get("email"),
    });
    console.log(data);

    return {
      status: 200,
      message: data?.data?.message ?? "Check email to reset password",
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

export async function resetPasswordAction(
  prevState: State,
  formdata: FormData
) {
  try {
    const { data } = await axios.post(RESET_PASSWORD_URL, {
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirm_password"),
      token: formdata.get("token"),
    });
    console.log("data is ", data);

    return {
      status: 200,
      message: data?.message ?? "Password Reset successfully",
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
