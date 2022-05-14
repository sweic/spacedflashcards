import React, {useState, useEffect} from 'react'
import { EMPTY_DECK, DAYS } from "../constants"
import {Card, DeckType} from '../types/deck'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { apiRequest } from "../../redux/reducers/api"
import { fetchDecks } from "../../redux/reducers/decks"
import RRule from 'rrule'
export const useCreate = (details: DeckType) => {

    useEffect(() => {
        if (details) {
          setDeck(details["cards"])
          setFront(details["cards"][0]["front"])
          setBack(details["cards"][0]["back"])
          setDesc(details["desc"])
          setTitle(details["title"])
          setCount(details["count"])
          const rruletest = RRule.fromString(details["rrule"])
          const byweekday = rruletest.options.byweekday
          let tmprrule = []
          if (byweekday) {
            for (const day of byweekday) {
                tmprrule.push(DAYS[day])
              }
          }
          
          setDaySelect(tmprrule)
    
        }
      }, [])
      
    const [front, setFront] = useState<string>("")
    const [back, setBack] = useState<string>("")
    const [curr, setCurr] = useState<number>(-1)
    const [deck, setDeck] = useState<Card[]>(EMPTY_DECK)
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [overviewOpened, setOverviewOpened] = useState(false)
    const [previewOpened, setPreviewOpened] = useState(false)
    const [daySelect, setDaySelect] = useState<string[]>(DAYS)
    const [count, setCount] = useState<number | undefined>(1)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)

    const saveText = (tmpp: Card[], idx: number) => {
        const tmp = tmpp.map((card) => Object.assign({}, card))
        tmp[idx]["front"] = front
        tmp[idx]["back"] = back
        setDeck(EMPTY_DECK)
        setDeck(tmp)
        return tmp
    }


    const nextCard = () => {
        const idx = curr
        saveText(deck, idx)
        if (curr + 1 >= deck.length) {
            addCard()
            return;
        }
        setCurr(curr + 1)
        setFront(deck[curr + 1]["front"])
        setBack(deck[curr + 1]["back"])
    }

    const previousCard = () => {
        if (curr === -1 ) return
        const idx = curr
        saveText(deck, idx)
        setCurr(curr - 1)
        if (curr === 0) return
        setFront(deck[curr - 1]["front"])
        setBack(deck[curr - 1]["back"])
    }

    const addCard = async () => {
        new Promise<Card[]>((resolve) => {
            const tmp = saveText(deck as Card[], curr)
            resolve(tmp)
        }).then((tmp) => {
            tmp.push({
                front: "",
                back: ""
            })
            setDeck(tmp)
            setFront('')
            setBack('')
            setCurr(deck.length)
        })
        
    }

    const deleteCard = () => {
        if (deck.length === 1) {
            return
        }
        const tmp = deck.map((card) => Object.assign({}, card))
        tmp.splice(curr, 1)
        setFront(deck[curr === 0 ? curr + 1 : curr - 1]["front"])
        setBack(deck[curr === 0 ? curr + 1 : curr - 1]["back"])
        setCurr(curr === 0 ? 0 :  curr - 1)
        setDeck(tmp)
    }

    const saveDeck = async (isEdit: string) => {
        const tmp = deck.map((card) => Object.assign({}, card))
        tmp[curr]["front"] = front
        tmp[curr]["back"] = back
        const body = {cards: tmp, title: title, desc: desc, user: user, rrule: daySelect, count: count}

        // error handling todo here
        if (isEdit) {
            await dispatch(apiRequest({method: 'POST', url: 'editDeck', data: {...body, id: isEdit, type: 'UPDATE'}})).then(async (res) =>  await dispatch(fetchDecks(true)))

        } else {
            await dispatch(apiRequest({method: 'POST', url: 'saveDeck', data: body, type: 'CREATE'})).then(async () => await dispatch(fetchDecks(true)))
        }
    }

    const jumpTo = (target: number) => {
        saveText(deck, curr)
        setCurr(target)
        setFront(deck[target]["front"])
        setBack(deck[target]["back"])
    }

    const jumpHandler = (idx: number) => {
        jumpTo(idx)
        setOverviewOpened(false)
    }

    const openOverview = () => {
        saveText(deck, curr)
        setOverviewOpened(true)
    }
    const openPreview = () => {
        saveText(deck, curr)
        setPreviewOpened(true)
    }

    const addDay = (day: string) => {
        setDaySelect(old => [...old, day])
    }

    const removeDay = (day: string) => {
        const tmp = daySelect.filter((target) => target !== day)
        setDaySelect(tmp)
    }

    const handleDaySelect = (day: string) => {

        if (daySelect.includes(day)) {
            removeDay(day)
        } else {
            addDay(day)
        }
    }


    return {front, setFront, back, setBack, curr, setCurr, deck, setDeck, addCard, previousCard, nextCard, deleteCard, saveDeck, setTitle, setDesc, title, desc, handleDaySelect, count, setCount, daySelect, saveText, jumpHandler, setOverviewOpened, setPreviewOpened, overviewOpened, previewOpened, openOverview, openPreview,  setDaySelect}

}