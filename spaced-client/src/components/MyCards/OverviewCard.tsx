import { Button } from "@mantine/core"
import React, {useState} from 'react'
import { Card } from "../../types/deck"
import {ExternalLink, Refresh} from 'tabler-icons-react'


function OverviewCard({cardInfo, idx, jumpHandler}: {cardInfo: Card, idx: number, jumpHandler: Function}) {
    const [isFront, setIsFront] = useState(true)
    return (
    <div className="overview-card-container">
        <div className="overview-card-btn">
            <p>{idx + 1}.</p>
            <ExternalLink onClick={() => jumpHandler(idx)} size={20} className="controller-icon-overview" style={{cursor: "pointer", padding: '0.5em'}}/>
            <Refresh onClick={() => setIsFront(!isFront)} size={20} className="controller-icon-overview" style={{cursor: "pointer", padding: '0.5em'}}/>
        </div>
        <div className="overview-card">
          {isFront ? <span dangerouslySetInnerHTML={{__html: cardInfo["front"]}}></span> : <span dangerouslySetInnerHTML={{__html: cardInfo["back"]}}></span>}
        </div>
        
    </div>
      
  )
}

export default OverviewCard