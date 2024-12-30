import { Server } from "socket.io";
import { votingQueue, VotingQueueName } from "./jobs/VotingJob.js";
import { commentJobName, commentQueue } from "./jobs/CommentJob.js";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("connect_error", (err) => {
      console.log("socket error", err);
    });
    console.log("A user is connected ", socket.id);

    //listen
    socket.onAny(async (eventNames: String, data: any) => {
      if (eventNames.startsWith("clashing-comment-")) {
        await commentQueue.add(commentJobName, data);
        socket.broadcast.emit(`clashing-comment-${data.id}`, data);
      } else if (eventNames.startsWith("clashing-")) {
        await votingQueue.add(VotingQueueName, data);
        socket.broadcast.emit(`clashing-${data.clashID}`, data);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}
