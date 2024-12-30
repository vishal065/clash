import { io } from "socket.io-client";
import Env from "./env";

const socket = io(Env.BACKEND_APP_URL);

export default socket;