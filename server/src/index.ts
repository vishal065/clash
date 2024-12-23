import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";
// import ejs from "ejs";
import IndexRoutes from "./routes/index.js";

//queues
import "./jobs/index.js";
// import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

import * as dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname + `views`);

const PORT: number = Number(process.env.PORT) || 4001;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//Routes
app.use(IndexRoutes);

// app.get("/", async (_, res) => {
//   const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
//     name: "vishal",
//   });
//   console.log("html is - ", html);

//   try {
//     emailQueue.add(emailQueueName, {
//       to: "yijorey751@evusd.com",
//       subject: "testing",
//       body: html,
//     });
//     res.json({ message: "res sendd" });
//     return;
//   } catch (error) {
//     console.error("api error- ", error);
//   }
//   //   res.render("welcome"); //file ka naam in views
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
