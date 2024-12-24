import path from "path";
import express, { Application } from "express";
import { fileURLToPath } from "url";
import IndexRoutes from "./routes/index.js";
import { appLimiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
dotenv.config();

//queues
import "./jobs/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname + `views`);

const PORT: number = Number(process.env.PORT) || 4001;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
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

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
