import { Button } from "@mantine/core"
import React, {useState} from 'react'
import {ExternalLink, Refresh} from 'tabler-icons-react'
import { Card } from "../../types/deck"
import { DeckBtnCircular } from "../Decks/DeckBtn"
import { OverviewCardContainer, OverviewCardBtns, OverviewCardContent } from "./Styles"


function OverviewCard({cardInfo, idx, jumpHandler}: {cardInfo: Card, idx: number, jumpHandler: Function}) {
    const [isFront, setIsFront] = useState(true)
    return (
    <OverviewCardContainer>
        <OverviewCardBtns>
            <p>{idx + 1}</p>
            <DeckBtnCircular control={<ExternalLink data-id={`overview-card-${idx}-jump`} size={20}/>} onClick={() => jumpHandler(idx)}/>
            <DeckBtnCircular  onClick={() => setIsFront(!isFront)} control={<Refresh data-id={`overview-card-${idx}-flip`} size={20}/>}/>
        </OverviewCardBtns>
        <OverviewCardContent>
            {isFront ? <span data-id={`overview-card-${idx}-front`} dangerouslySetInnerHTML={{__html: cardInfo["front"]}}></span> : <span data-id={`overview-card-${idx}-back`} dangerouslySetInnerHTML={{__html: cardInfo["back"]}}></span>}
        </OverviewCardContent>
    </OverviewCardContainer>
      
  )
}

export default OverviewCard