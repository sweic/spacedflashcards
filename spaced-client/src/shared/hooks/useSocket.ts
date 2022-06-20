import React, { useEffect } from "react";
import { fetchDecks } from "../../redux/reducers/decks";
import {
  deleteActivity,
  newActivity,
  newFriend,
  newSentRequest,
  removeSentRequest,
} from "../../redux/reducers/social";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UserActivity, UserActivityNotification } from "../types/social";

function useSocket() {
  const social = useAppSelector((state) => state.social);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    social.socket.emit("init", { user: user });
    social.socket.on("notification", (args) => {
      dispatch(newActivity(args));
    });

    social.socket.on("delete", (args: UserActivity) => {
      dispatch(deleteActivity(args.newActivityHistory));
    });

    social.socket.on("accept", (args: UserActivity) => {
      dispatch(newFriend(args.from));
      dispatch(deleteActivity(args.newActivityHistory));
      dispatch(newActivity({ ...args, from: args.to, to: args.from }));
    });

    social.socket.on("import", async (args) => {
      await dispatch(fetchDecks(true));
    });

    social.socket.on("accepted", (args: UserActivity) => {
      const newSentRequest = [...social.sentFriendRequest];
      const idx = newSentRequest.indexOf(args.from);
      newSentRequest.splice(idx, 1);
      const newActivityData = { ...args, type: "ACCEPTED" };
      delete newActivityData["newActivityHistory"];
      dispatch(newFriend(args.to));
      dispatch(removeSentRequest(newSentRequest));
      dispatch(newActivity({ ...args, type: "ACCEPTED" }));
    });

    social.socket.on("request", (args: UserActivity) => {
      dispatch(newSentRequest(args.to));
    });
  }, [user]);
}

export default useSocket;
