import Env from "./env";

export const BaseUrl = `${Env.BACKEND_APP_URL}/api`;
export const Register_URL = `${BaseUrl}/auth/register`;
export const LOGIN_URL = `${BaseUrl}/auth/login`;
export const CHECK_CREDENTIALS_URL = `${BaseUrl}/auth/check/credentials`;
export const FORGET_PASSWORD_URL = `${BaseUrl}/auth/forget-password`;
export const RESET_PASSWORD_URL = `${BaseUrl}/auth/reset-password`;

//env

export const NEXT_AUTH_SECRECT = process.env.NEXT_AUTH_SECRECT!;

//clash
export const CLASH_URL = `${BaseUrl}/clash`;
export const CLASH_ITEMS_URL = `${BaseUrl}/clash/items`;
