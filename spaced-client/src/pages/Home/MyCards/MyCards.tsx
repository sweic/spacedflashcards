import React, { useState } from "react";
import { Loader } from "tabler-icons-react";
import { useAppSelector } from "../../../redux/store";
import Deck from "../../../shared/components/Decks/Deck";
import { MyCardsContainer } from "../../../shared/components/Decks/Styles";
import DeleteModal from "../../../shared/components/Modal/DeleteModal";
import Modal from "../../../shared/components/Modal/Modal";
import ShareFriend from "../../../shared/components/Modal/ShareFriend";
import ShareID from "../../../shared/components/Modal/ShareID";
import { createQueryModal } from "../../../shared/utils/queryModal";
function MyCards() {
  const deckData = useAppSelector((state) => state.dataStore);
  const user = useAppSelector((state) => state.auth.user);
  const deleteModal = createQueryModal("delete");
  const shareIDModal = createQueryModal("shareID");
  const shareFriendModal = createQueryModal("shareFriend");
  return (
    <>
      {deckData ? (
        <MyCardsContainer data-id="home-mycards-container">
          {deckData.decks.map((deck) => {
            return (
              <Deck
                appProps={{
                  details: deck,
                  openDeleteModal: deleteModal.open,
                  openShareFriendModal: shareFriendModal.open,
                  openShareIDModal: shareIDModal.open,
                }}
              />
            );
          })}
        </MyCardsContainer>
      ) : (
        <Loader />
      )}
      <Modal
        width={440}
        onClose={deleteModal.close}
        withCloseButton={false}
        renderContent={<DeleteModal onClose={deleteModal.close} />}
        isOpen={deleteModal.isOpen()}
      />
      <Modal
        width={440}
        onClose={shareIDModal.close}
        withCloseButton={true}
        renderContent={<ShareID />}
        isOpen={shareIDModal.isOpen()}
      />
      <Modal
        width={440}
        onClose={shareFriendModal.close}
        withCloseButton={true}
        renderContent={<ShareFriend onClose={shareFriendModal.close} />}
        isOpen={shareFriendModal.isOpen()}
      />
    </>
  );
}

export default MyCards;
