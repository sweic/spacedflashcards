import styled from 'styled-components'
import {color} from '../../utils/styles';


export const OverviewContainer = styled.div`
    height: 100%;
    padding-right: 1em;
    overflow-y: auto;
`

export const Gap = styled.div`
    height: 30px;
`

export const OverviewCardContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1.5em;
`
export const OverviewCardBtns = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

export const OverviewCardContent = styled.div`
    word-wrap: break-word;
    padding: 1em 0.5em;
    width: 86%;
    height: 125px;
    color: black;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-shadow: 0px 1px 2px rgb(0 0 0 /0.2);

    span {
        width: 100%;
        word-wrap: break-word;
        margin: auto !important;
    }
`
