class Env {
  static APP_URL: string = process.env.NEXT_PUBLIC_APP_URL as string;
  static BACKEND_APP_URL: string = process.env.NEXT_PUBLIC_BACKEND_APP_URL!;
}

export default Env;
