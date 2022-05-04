import React from 'react'
import {Drawer, Button} from '@mantine/core'
import {OverviewPropsTypes} from '../../types/props'
import OverviewCard from "./OverviewCard"
import '../../styles/mycards.css'

function Overview({appProps}:{appProps: OverviewPropsTypes}) {
    const {overviewOpened, setOverviewOpened, jumpHandler, deck} = appProps
  return (
    <>
    <Drawer title={<h3 style={{paddingLeft: '.6em'}}>Deck Overview</h3>} size="xl" padding="md" opened={overviewOpened} onClose={() => setOverviewOpened(false)}>
        <div style={{overflowY: 'auto', height: '100%', paddingRight: '1em'}}>

        {deck.map((card, idx) => {
            return <OverviewCard cardInfo={card} idx={idx} jumpHandler={jumpHandler} />
        })}
        <div style={{height: '30px'}}></div>
        </div>
        
    </Drawer>
    </>
  )
}

export default Overview