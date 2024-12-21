import { ConnectionOptions, DefaultJobOptions } from "bullmq";
import * as dotenv from "dotenv";
dotenv.config();

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASS,
};

export const defaultQueueOptions: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 2000,
  },
  removeOnFail: false, //to check logs
};
