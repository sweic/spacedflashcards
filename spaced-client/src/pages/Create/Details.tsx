import React from 'react'
import { Button, TextInput, Textarea, NumberInput } from "@mantine/core"
import { CreateDetailsContainer, DayChooser, DayNode } from "./Styles"
import { DAYS } from "../../shared/constants"
import { DetailsPropTypes } from "../../shared/types/props"


function Details({appProps} : {appProps: DetailsPropTypes}) {
    const {title, setTitle, desc, setDesc, setCurr, handleDaySelect, count, setCount, daySelect} = appProps


  return (
    <>
    <CreateDetailsContainer>
        <TextInput label="Deck title" placeholder="Max 40 characters" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={40}/>
        <Textarea minRows={4} label="Deck description" placeholder="Max 100 characters" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={100}/>
        <DayChooser>
            {DAYS.map((day) => {
                return (
                    <DayNode onClick={() => handleDaySelect(day)} key={day} selected={daySelect.includes(day)}>{day}</DayNode>
                )
            })}
        </DayChooser>
        <NumberInput value={count} onChange={(val) => setCount(val)}label="Number of times a day" placeholder = "Number of times a day" min={1} />
        <Button disabled={title.length === 0} onClick={() => setCurr(0)}>Next</Button>
    </CreateDetailsContainer>
    </>
  )
}

export default React.memo(Details)