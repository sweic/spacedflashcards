import React from "react";
import { FlashcardsPropsTypes } from "../../shared/types/props";
import {
  FlashcardsBox,
  SideDisplay,
  FrontCard,
  BackCard,
  PlaceholderCard,
} from "./Styles";

function Flashcards({ appProps }: { appProps: FlashcardsPropsTypes }) {
  const { isAnimating, isFrontRef, currCardRef, details } = appProps;

  return (
    <FlashcardsBox data-id="study-flashcards-box">
      <SideDisplay data-id="study-side-display">
        {isFrontRef.current ? "FRONT" : "BACK"}
      </SideDisplay>
      {isFrontRef.current ? (
        <FrontCard
          data-id="study-front-card"
          isAnimating={isAnimating}
          isFrontRef={isFrontRef.current}
          shown={isFrontRef.current}
          dangerouslySetInnerHTML={{
            __html: details["cards"][currCardRef.current]["front"],
          }}
        />
      ) : (
        <BackCard
          data-id="study-back-card"
          isAnimating={isAnimating}
          isFrontRef={isFrontRef.current}
          shown={!isFrontRef.current}
          dangerouslySetInnerHTML={{
            __html: details["cards"][currCardRef.current]["back"],
          }}
        />
      )}
      <PlaceholderCard />
    </FlashcardsBox>
  );
}

export default React.memo(Flashcards);
