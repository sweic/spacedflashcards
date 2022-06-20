import React from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, Refresh, ChevronRight, Check } from "tabler-icons-react";
import { DeckBtnCircular } from "../../shared/components/Decks/DeckBtn";
import { CardControllerPropsTypes } from "../../shared/types/props";
import { FlashcardController } from "./Styles";

function CardController({
  appProps,
  closePreview,
}: {
  appProps: CardControllerPropsTypes;
  closePreview?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams();
  const {
    previousCard,
    nextCard,
    toggleSide,
    currCardRef,
    cards,
    completeDeck,
  } = appProps;
  const handler = () => {
    if (closePreview) closePreview(false);
    else completeDeck(id as string);
  };
  return (
    <>
      <FlashcardController>
        <DeckBtnCircular
          control={<ChevronLeft data-id="study-previous-btn" size={36} />}
          onClick={() => previousCard()}
        ></DeckBtnCircular>
        <DeckBtnCircular
          control={<Refresh data-id="study-flip-btn" size={36} />}
          onClick={() => toggleSide()}
        ></DeckBtnCircular>
        {currCardRef.current + 1 !== cards.length ? (
          <DeckBtnCircular
            control={<ChevronRight data-id="study-next-btn" size={36} />}
            onClick={() => nextCard()}
          ></DeckBtnCircular>
        ) : (
          <DeckBtnCircular
            control={<Check data-id="study-check-btn" size={36} />}
            onClick={() => handler()}
          ></DeckBtnCircular>
        )}
      </FlashcardController>
    </>
  );
}

export default React.memo(CardController);
