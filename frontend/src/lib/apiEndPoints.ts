import Env from "./env";

export const BaseUrl = `${Env.BACKEND_APP_URL}/api`;
export const Register_URL = `${BaseUrl}/auth/register`;
export const LOGIN_URL = `${BaseUrl}/auth/login`;
export const CHECK_CREDENTIALS_URL = `${BaseUrl}/auth/check/credentials`;
