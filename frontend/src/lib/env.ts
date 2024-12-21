class Env {
  static APP_URL: string = process.env.APP_URL as string;
  static BACKEND_APP_URL: string = process.env.BACKEND_APP_URL!;
}

export default Env;
