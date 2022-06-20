import { TextInput, Paper } from "@mantine/core";
import React from "react";
import { Loader, Search } from "tabler-icons-react";
import { useAppSelector } from "../../redux/store";
import { useSearch } from "../../shared/hooks/useSearch";
import { FriendsContainer } from "./Styles";
import UserSearch from "./UserSearch";

function FriendList() {
  const {
    searchInput,
    currentSearchHistory,
    searchHistoryHandler,
    queriedSearchHistory,
    loading,
  } = useSearch();
  const user = useAppSelector((state) => state.auth.user);
  const social = useAppSelector((state) => state.social);
  return (
    <FriendsContainer data-id="friend-search">
      <TextInput
        data-id="search-input"
        size="md"
        icon={<Search size={18} />}
        placeholder="Search"
        value={searchInput}
        onChange={(event) => searchHistoryHandler(event)}
      />
      <Paper
        data-id="friend-search-list"
        withBorder
        shadow="md"
        style={{ backgroundColor: "#f4f5f7", height: "500px" }}
      >
        {currentSearchHistory.map((search) => {
          if (search.username === user) return;
          return (
            <UserSearch
              data-id={`user-search-${search.username}`}
              search={search}
              sent={social.sentFriendRequest.includes(search.username)}
              isFriend={social.friends.includes(search.username)}
            />
          );
        })}
        {loading && <Loader />}
        {queriedSearchHistory.map((search) => {
          if (search.username === user) return;
          return (
            <UserSearch
              data-id={`user-search-${search.username}`}
              search={search}
              sent={social.sentFriendRequest.includes(search.username)}
              isFriend={social.friends.includes(search.username)}
            />
          );
        })}
      </Paper>
    </FriendsContainer>
  );
}

export default FriendList;
