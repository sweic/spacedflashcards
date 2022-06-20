import { ActivityType, UsersocialsDecks } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface UserActivityNotification {
  from: string;
  to: string;
  type: ActivityType;
  when: Date;
  deck?: UsersocialsDecks;
}
export interface UserActivity {
  target?: string;
  from: string;
  to: string;
  type: ActivityType;
  when?: Date;
  deck?: UsersocialsDecks;
  sharedFriends?: string[];
  newActivityHistory?: UserActivityNotification[];
}

const hour = 1000 * 60 * 60;
export async function initWebSocket(
  ws: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  ws.on("connection", async (socket) => {
    socket.on("init", async (args) => {
      const { user } = args;
      if (!user) return;
      socket.join(user);
    });

    socket.on("delete", (args: UserActivity) => {
      ws.in(args.target!).emit("delete", args);
    });

    socket.on("send", async (args: UserActivity) => {
      ws.in(args.from).emit("send", args);
    });

    socket.on("accept", async (args: UserActivity) => {
      ws.in(args.to).emit("accept", args);
      ws.in(args.from).emit("accepted", args);
    });

    socket.on("imported", (args: UserActivity) => {
      ws.in(args.to).emit("imported");
    });

    socket.on("request", (args: UserActivity) => {
      ws.in(args.from).emit("request", args);
      ws.in(args.to).emit("notification", args);
    });

    socket.on("share", (args: UserActivity) => {
      ws.in(args.to).emit("notification", args);
    });

    socket.on("import", (args: UserActivity) => {
      ws.in(args.to).emit("import", args);
    });
  });
}
