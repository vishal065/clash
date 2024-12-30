import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import prismaInstance from "../config/database.js";

export const VotingQueueName = "votingQueue";

export const votingQueue = new Queue(VotingQueueName, {
  connection: redisConnection,
  defaultJobOptions: { ...defaultQueueOptions, delay: 500 },
});

export const votingQueueWorker = new Worker(
  VotingQueueName,
  async (job: Job) => {
    const data = job.data;
    await prismaInstance.clashItem.update({
      where: { id: Number(data?.clashItemsID) },
      data: { count: { increment: 1 } },
    });
  },
  { connection: redisConnection }
);
