import { TodoDeckType } from "./dashboard";

export interface UserSocial {
  username: string;
  userID: string;
}

export interface UserActivity {
  from: string;
  to: string;
  type: UserActivityType;
  when?: Date;
  deck?: UserActivityDeck;
  sharedFriends?: string[];
  newActivityHistory?: ActivityHistoryList;
}

export interface UserActivityDeck {
  title: string;
  deckID: string;
}

export interface UserSocialDeckType {
  deckID: string;
  title: string;
  count: number;
}

export interface UserActivityNotification {
  from: string;
  to: string;
  type: UserActivityType;
  when: Date;
  deck?: UserSocialDeckType;
}

export interface UserSocialSocket {
  from: string;
  to: string;
  type: UserActivityType;
  sharedFriends?: string[];
}

export type UserActivityType =
  | "COMPLETE"
  | "REQUEST"
  | "ACCEPT"
  | "ACCEPTED"
  | "SHARE"
  | "IMPORTED"
  | "DELETE";
export type SearchHistoryType = UserSocial[];
export type FriendListType = UserSocial[];
export type ActivityHistoryList = UserActivityNotification[];
