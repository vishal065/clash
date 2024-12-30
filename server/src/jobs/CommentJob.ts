import { Queue, Worker, Job } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import prismaInstance from "../config/database.js";

export const commentJobName = "commentQueue";

export const commentQueue = new Queue(commentJobName, {
  connection: redisConnection,
  defaultJobOptions: { ...defaultQueueOptions, delay: 500 },
});

export const commentWorker = new Worker(
  commentJobName,
  async (job: Job) => {
    const data = job.data;
    await prismaInstance.clashComments.create({
      data: { comment: data?.comment, clashId: Number(data?.id) },
    });
  },
  { connection: redisConnection }
);
