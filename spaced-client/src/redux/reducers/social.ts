import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSocial, UserActivity, UserActivityNotification, ActivityHistoryList } from "../../types/social";
import { io, Socket } from "socket.io-client";

interface UserSocialClient {
    searchHistory: UserSocial[],
    friends: string[],
    activityHistory: ActivityHistoryList,
    sentFriendRequest: string[],
    socket: Socket 
}

const initialState: UserSocialClient =  {
    searchHistory: [],
    friends: [],
    activityHistory: [],
    sentFriendRequest: [],
    socket: io('http://localhost:5000')
}
const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        updateSocial(state, action) {
            state.searchHistory = action.payload.searchHistory
            state.friends = action.payload.friends
            state.activityHistory = action.payload.activityHistory
            state.sentFriendRequest = action.payload.sentFriendRequest
        },
        newActivity(state, action) {
            delete action.payload["newActivityHistory"]
            state.activityHistory.push(action.payload)
        },
        deleteActivity(state, action) {
            state.activityHistory = action.payload
        },
        newSentRequest(state, action) {
            state.sentFriendRequest = [...state.sentFriendRequest, action.payload]
        },
        removeSentRequest(state, action) {
            state.sentFriendRequest  = action.payload
        },
        newFriend(state, action) {
            state.friends = [...state.friends, action.payload]
        }
    }
})

export const {updateSocial, newActivity, deleteActivity, newSentRequest, newFriend, removeSentRequest} = socialSlice.actions
export default socialSlice.reducer