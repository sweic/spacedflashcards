import React, {useEffect, useRef, useState} from 'react'
import DynamicHeader from "../Common/DynamicHeader"
import '../../styles/texteditor.css'
import { Button, Menu} from "@mantine/core"
import {useCreate} from '../../hooks/useCreate'
import { useNavigate } from "react-router-dom"
import TextEditor from "./TextEditor"
import Controllers from'./Controllers'
import Details from './Details'
import {useAppSelector} from '../../redux/store'
import Overview from "../MyCards/Overview"
import Preview from '../MyCards/Preview'
import {BrandStackoverflow, Eye, Adjustments} from 'tabler-icons-react'
import { DeckType } from "../../types/deck"

function Create({details}: {details?: DeckType}) {

  const {front, setFront, back, setBack, curr, deck, addCard, previousCard, nextCard, deleteCard, saveDeck, title, desc, setDesc, setTitle, setCurr, count, setCount, handleDaySelect, daySelect, jumpHandler, overviewOpened, previewOpened, setOverviewOpened, setPreviewOpened, openOverview, openPreview} = useCreate(details!)
  
  const navigate = useNavigate()
  const api = useAppSelector(state => state.api)

  const saveHandler = async () => {
    if (details) {
      await saveDeck(details.id)
    } else {
      await saveDeck('')
    }
    navigate('/u/home')
  }

  

  return (
    <div className="create-containers">
      <DynamicHeader appProps={{headerName: details ? "Edit" : "Create", displayBack: true}}/>
      <div className="create-container">
        {curr !== -1 && <>
        <div className="root-rte-container">
          <Overview  appProps={{overviewOpened, setOverviewOpened, jumpHandler, deck}}/>
          <Preview appProps={{previewOpened, setPreviewOpened, details: {title: "", id: "", desc: "", cards: deck, count: 0, rrule: ""}}}/>
          <div className="label-root-rte">
            <h2>Front</h2>
            <TextEditor text={front} debounceFunction={setFront} />
          </div>
          <div className="label-root-rte">
            <h2>Back</h2>
            <TextEditor text={back} debounceFunction={setBack}/>
          </div>
        </div>
          <Controllers appProps={{deleteCard, previousCard, curr, deck, addCard, nextCard}}/>
        <div style={{display: 'flex', width: '300px' , justifyContent: 'space-evenly', marginTop: '1.5em !important', gap: '0.5em', margin: '1.5em auto', position: 'relative'}}>
          <Button onClick={() => saveHandler()} className="save-btn" loading={api.loading === 'pending'} >
            Save
          </Button>
          <Menu className='more-options-icon' position="top"  control={<div><Adjustments className="options"></Adjustments></div>}>
            <Menu.Item  onClick={() => openOverview()} icon={<BrandStackoverflow size={24}/>}>Overview</Menu.Item>
            <Menu.Item onClick={() => openPreview()} icon={<Eye size={24} />}>Preview</Menu.Item>
         </Menu>
        </div></>}

        {curr === -1 && <>
          <Details appProps={{daySelect, title, setTitle, desc, setDesc, setCurr, handleDaySelect, count, setCount}}/>
        </>}
    </div>
    </div>
  )
}

export default Create