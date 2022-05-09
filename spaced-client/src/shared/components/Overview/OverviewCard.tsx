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
            <DeckBtnCircular control={<ExternalLink  size={20}/>} onClick={() => jumpHandler(idx)}/>
            <DeckBtnCircular onClick={() => setIsFront(!isFront)} control={<Refresh  size={20}/>}/>
        </OverviewCardBtns>
        <OverviewCardContent>
            {isFront ? <span dangerouslySetInnerHTML={{__html: cardInfo["front"]}}></span> : <span dangerouslySetInnerHTML={{__html: cardInfo["back"]}}></span>}
        </OverviewCardContent>
    </OverviewCardContainer>
      
  )
}

export default OverviewCard