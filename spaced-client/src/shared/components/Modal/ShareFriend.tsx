import { Button, Checkbox, Text } from "@mantine/core";
import React, { useState } from "react";
import { UserCircle } from "tabler-icons-react";
import { useAppSelector } from "../../../redux/store";
import { useSocial, useSocialAPI } from "../../hooks/useSocial";
import styled from "styled-components";
function ShareFriend({ onClose }: { onClose: () => void }) {
  const params = new URLSearchParams(window.location.search);
  const deckID = params.get("id");
  const friends = useAppSelector((state) => state.social.friends);
  const { sharedFriendHandler, sharedFriends } = useSocial();
  const { shareHelper } = useSocialAPI();
  const [currDeckID, undefined] = useState(deckID);
  return (
    <>
      {currDeckID && (
        <ShareFriendContainer>
          <FriendContainer>
            {friends.map((friend, idx) => {
              return (
                <FriendComponent key={friend}>
                  <ShareTitle>
                    <UserCircle color="black" />{" "}
                    <Text color="black">{friend}</Text>
                  </ShareTitle>
                  <ShareBtnContainer>
                    <Checkbox
                      data-id={`share-checkbox-${friend}`}
                      id={`${friend}`}
                      checked={sharedFriends.includes(friend)}
                      onChange={(e) => sharedFriendHandler(e)}
                    />
                  </ShareBtnContainer>
                </FriendComponent>
              );
            })}
          </FriendContainer>
          <Button
            data-id="share-friends-btn"
            disabled={sharedFriends.length === 0}
            onClick={() => {
              shareHelper(currDeckID, sharedFriends);
              onClose();
            }}
          >
            Share
          </Button>
        </ShareFriendContainer>
      )}
    </>
  );
}

export default ShareFriend;

const ShareFriendContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const FriendContainer = styled.ul`
  height: 200px;
  overflow-y: auto;
`;
const FriendComponent = styled.li`
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;
const ShareTitle = styled.div`
  display: flex;
  gap: 1em;
`;
const ShareBtnContainer = styled.div``;
