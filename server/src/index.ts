import path from "path";
import express, { Application } from "express";
import { fileURLToPath } from "url";
import IndexRoutes from "./routes/index.js";
import { appLimiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import helmet from "helmet";
import { createServer, Server as httpServer } from "http";
import cors from "cors";
dotenv.config();

//queues
import "./jobs/index.js";
import { setupSocket } from "./Socket.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT: number = Number(process.env.PORT) || 4001;
const app: Application = express();

const server: httpServer = createServer(app);
const io = new Server(server, { cors: { origin: process.env.APP_URL } });
export { io };
setupSocket(io);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(express.static("public"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//Routes
app.use(IndexRoutes);

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
