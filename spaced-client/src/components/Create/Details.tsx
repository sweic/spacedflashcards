import React from 'react'
import { Button, TextInput, Textarea, NumberInput } from "@mantine/core"
import {DetailsPropTypes} from '../../types/props'
import {DAYS} from '../../constants/index'

function Details({appProps} : {appProps: DetailsPropTypes}) {
    const {title, setTitle, desc, setDesc, setCurr, handleDaySelect, count, setCount, daySelect} = appProps


  return (
    <>
    <div className="set-tags-container">
        <TextInput label="Deck title" placeholder="Max 40 characters" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={40}/>
        <Textarea minRows={4} label="Deck description" placeholder="Max 100 characters" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={100}/>
        <div className="day-chooser">
          {DAYS.map((day) => {
            return (
              <span onClick={() => handleDaySelect(day)} key={day} className={`day-node ${daySelect.includes(day) ? 'selected-node' : ''}`}>
                <p>{day}</p>
              </span>
            )
          })}
        </div>
        <NumberInput value={count} onChange={(val) => setCount(val)}label="Number of times a day" placeholder = "Number of times a day" min={1} />
        <Button disabled={title.length === 0} onClick={() => setCurr(0)}>Next</Button>

     </div>
    </>
  )
}

export default React.memo(Details)