import { showNotification } from "@mantine/notifications";
import { Middleware } from "@reduxjs/toolkit";
import { apiLoading } from "../reducers/api";
import { userLogged } from "../reducers/auth";
import { updateData } from "../reducers/decks";
import { updateSocial } from "../reducers/social";

export const updateMiddleware: Middleware =
  (storeAPI) => (next) => async (action) => {
    await next(action);

    if (action.type.includes("apiRequest/pending")) {
      storeAPI.dispatch(apiLoading(action.meta.arg.type));
      return;
    }

    if (action.type.includes("apiSuccess")) {
      switch (action.payload.type) {
        case "VERIFY":
          storeAPI.dispatch(userLogged(action.payload.payload.data.user));
          return;
        case "FETCH":
          storeAPI.dispatch(
            updateData({
              decks: action.payload.payload.data.decks.decks,
              dashboardData: action.payload.payload.data.dashboard,
            })
          );
          storeAPI.dispatch(
            updateSocial({
              searchHistory: action.payload.payload.data.social.searchHistory,
              friends: action.payload.payload.data.social.friends,
              activityHistory:
                action.payload.payload.data.social.activityHistory,
              sentFriendRequest:
                action.payload.payload.data.social.sentFriendRequest,
            })
          );
          return;
        case "IMPORT":
          showNotification({
            title: "Success!",
            message: `Successfully imported Deck ${action.payload.payload.data.title} into My Cards!`,
          });
          return;
      }
    }
  };
