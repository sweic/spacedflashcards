import React from 'react'
import { FlashcardsPropsTypes } from "../../shared/types/props"
import { FlashcardsBox, SideDisplay, FrontCard, BackCard } from "./Styles"


function Flashcards({appProps}: {appProps: FlashcardsPropsTypes}) {
    const {isAnimating, isFrontRef, currCardRef, details} = appProps

  return (
    <FlashcardsBox>
        <SideDisplay>{isFrontRef.current ? "FRONT" : "BACK"}</SideDisplay>
        <FrontCard isAnimating={isAnimating} isFrontRef={isFrontRef.current} shown={isFrontRef.current} dangerouslySetInnerHTML={{__html: details["cards"][currCardRef.current]["front"]}}/>
        <BackCard isAnimating={isAnimating} isFrontRef={isFrontRef.current} shown={!isFrontRef.current}  dangerouslySetInnerHTML={{__html: details["cards"][currCardRef.current]["back"]}}/>
    </FlashcardsBox>
  )
}

export default React.memo(Flashcards)