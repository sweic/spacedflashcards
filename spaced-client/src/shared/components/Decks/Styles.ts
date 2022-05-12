import styled, {css} from 'styled-components'
import { color } from "../../utils/styles"
export const DeckContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: 320px;
    margin-bottom: 1em;
    padding: 0.5em 1em;
    flex-basis: 400px;
    flex-grow: 1;
    background-color: white;
    justify-content: space-between;

    > a {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`  
export const DeckInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    text-align: center;
    padding-top: 1em;
`

export const DeckBtns = styled.div`
    display: flex;
    justify-content: end;
    gap: 1.5em;
`

export const DeckBtn = styled.button`
    cursor: pointer;
    background-color: white;
    color: black;
    &:hover {
        color: ${color.primary};
    }

    &:active {
        transform: translateY(3px);
        color: ${color.primary};
    }
`

export const DeckBtnDangerous = styled(DeckBtn)`
    &:hover {
        color: ${color.dangerous};
    }
`

export const DeckBtnCircular = styled(DeckBtn)`
    color: white;
    display: flex;
    align-items: center;
    background-color: ${color.select};
    padding: 0.2em;
    border-radius: 1.2em;
    &:hover {
        color: white;
        background-color: ${color.text} !important;
    }

    
`

export const MyCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1em 1em;
    justify-content:space-around;
    gap: 1em;
    height: calc(100vh - 4em);
    overflow-y: auto;
`


const alignRight = css`
    position: absolute;
    right: 1em;
    top: 1em;
`