import React, { forwardRef, useRef, useState } from "react";
import { Trash, ChevronLeft, ChevronRight, Plus } from "tabler-icons-react";
import { DeckBtnCircular } from "../../shared/components/Decks/DeckBtn";
import { ControllerPropTypes } from "../../shared/types/props";
import { CreateBtnBox } from "./Styles";

function Controllers({ appProps }: { appProps: ControllerPropTypes }) {
  const { deleteCard, previousCard, curr, deck, addCard, nextCard } = appProps;

  return (
    <CreateBtnBox>
      <DeckBtnCircular
        control={<Trash data-id="create-delete-card-btn" size={24} />}
        onClick={(e) => deleteCard()}
      />
      <DeckBtnCircular
        control={
          <ChevronLeft
            data-id="create-previous-card-btn"
            size={36}
            strokeWidth={3}
          />
        }
        onClick={(e) => previousCard()}
      />
      <p data-id="create-deck-curr">{`${curr + 1} / ${deck.length}`}</p>
      <DeckBtnCircular
        control={
          <ChevronRight
            data-id="create-next-card-btn"
            size={36}
            strokeWidth={3}
          />
        }
        onClick={(e) => nextCard()}
      />
      <DeckBtnCircular
        control={<Plus data-id="create-add-card-btn" size={36} />}
        onClick={(e) => addCard()}
      />
    </CreateBtnBox>
  );
}

export default React.memo(Controllers);
