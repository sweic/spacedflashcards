import React from 'react'
import {ProgressPropsTypes} from '../../types/props'

function Progress({appProps}: {appProps: ProgressPropsTypes}) {
    const {currCardRef, cards} = appProps
  return (
    <div className="progressbar">
        <span className="maxbar"></span>
        <span style={{width: `${(currCardRef.current+1)/(cards.length) * 100}%`, height: '30px', backgroundColor: "#a5b8d1"}}className="currentbar"></span>
     </div>
  )
}

export default Progress