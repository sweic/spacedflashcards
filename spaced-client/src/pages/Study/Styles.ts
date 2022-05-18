import styled from 'styled-components'

import {color} from '../../shared/utils/styles'

interface CurrentBarProps {
    currentWidth: number
}

interface CommonCardProps {
    isAnimating?: boolean,
    isFrontRef?: boolean,
    shown?: boolean;
}

export const StudyContainer = styled.div`
    width: 100%;
    overflow-y: auto !important;
    
`
export const FlashcardsContainer = styled.div`
    word-wrap: break-word;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 1.5em;
    @media (min-width: 481px) {
        max-width: 800px;
    }
`
export const ProgressBar = styled.div`
    margin: 0 auto;
    position: relative;
    width: 90%;
    height: 30px;

    > * {
        border-radius: .8em;
    }
`

export const MaxBar = styled.span`
    width: 100%;
    background-color: #f5f5f5;
    height: 100%;
    position: absolute;
`

export const CurrentBar = styled.span<CurrentBarProps>`
    position: absolute;
    transition: 250ms ease-in-out width;
    height: 30px;
    background-color: ${color.select};
    width: ${props => props.currentWidth}%;
`
export const FlashcardsBox = styled.div`
    position: relative;
    height: 450px;
    margin-top: 1.5em;
    
    @media (max-height: 680px) {
        height: 400px;
    }

`

export const SideDisplay = styled.span`
    position: absolute;
    z-index: 1002;
    right: 10%;
    top: 6%;
    font-size: 14px;
    font-weight: bolder;
`

export const CommonCard = styled.div`
    background-color: #f5f5f5;
    margin-top: 1em;
    height: 450px;
    box-shadow: 0px 3px 3px rgb(0 0 0 /0.2);
    left:0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: safe center;
    position: absolute;
    padding: 1.5em;
    word-wrap: break-word;
    height: 450px;
    overflow-y: auto !important;
    margin: auto !important;
    max-width: 100%;
    max-height: 100%;

    > * {
        color: black;
        margin: auto !important;
    }

    @media (min-width: 481px) {
        min-width: 400px;
        max-width: 87%;
    }

    @media (max-width: 480px) {
        padding: 1.5em !important;
        max-width: 82% !important;
        height: 380px !important;
    }

    @media (max-height: 680px) {
        padding: 1.5em !important;
        max-width: 82% !important;
        height: 380px !important;  
    }

    
`

export const FrontCard = styled(CommonCard)<CommonCardProps>`
    transform: ${props => props.isAnimating && props.isFrontRef ? "translateY(-10%)" : "translateY(0%)"};
    transition: ${props => props.isAnimating && props.isFrontRef ? "" : "300ms ease-in-out"};
    z-index: ${props => props.shown ? '1000' : "1"};
    display: ${props => props.shown ? "" : "none"};

`

export const BackCard = styled(CommonCard)<CommonCardProps>`
    transform: ${props => props.isAnimating && !props.isFrontRef ? "translateY(-10%)" : "translateY(0%)"};
    transition: ${props => props.isAnimating && !props.isFrontRef ? "" : "300ms ease-in-out"};
    z-index: ${props => props.shown ? '1000' : "1"};
    display: ${props => props.shown ? "" : "none"};

`

export const PlaceholderCard = styled(CommonCard)<CommonCardProps>`
    z-index: 999
`

export const FlashcardController = styled.div`
    color: white;
    align-items: center;
    margin: 1em auto;
    width: 300px;
    height: 60px;
    background-color: #a5b8d1;
    border-radius: 2em;
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 480px) {
        margin-top: .8em !important;
    }

    @media (max-height: 680px) {
        margin: .8em auto !important;
    }
`