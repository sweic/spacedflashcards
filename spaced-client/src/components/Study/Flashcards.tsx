import React from 'react'
import { FlashcardsPropsTypes } from "../../types/props"

function Flashcards({appProps}: {appProps: FlashcardsPropsTypes}) {
    const {isAnimating, isFrontRef, currCardRef, details} = appProps

  return (
    <div className="flashcards">
        <span className="side-display">{isFrontRef.current ? "FRONT" : "BACK"}</span>

        <div className={`front-card ${isAnimating && isFrontRef.current ? 'animating' : 'finished'} ${isFrontRef.current && 'shown'}`} dangerouslySetInnerHTML={{__html: details["cards"][currCardRef.current]["front"]}}/>

        <div className={`back-card ${isAnimating && !isFrontRef.current ? 'animating' : 'finished'} ${!isFrontRef.current && 'shown'}`} dangerouslySetInnerHTML={{__html: details["cards"][currCardRef.current]["back"]}}/>
    </div>
  )
}

export default Flashcards