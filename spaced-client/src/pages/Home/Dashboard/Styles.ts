import { Paper } from "@mantine/core";
import styled from 'styled-components';
import { color } from "../../../shared/utils/styles";

export const DashboardContainer = styled.div`
    display: flex;
    overflow-y: auto;
    padding: 1em 0em;
    margin-bottom: 1em;
    justify-content: space-around;
    max-height: calc(100vh-4em);
    @media (max-width: 800px) {
        flex-direction: column;

    }
`
export const ProgressCircle = styled.svg`
    margin-top: 2.5em;
    width: 330px;
    height: 300px;
    fill: none;
    @media (max-width: 800px) {
    margin: 0 auto;

    }
`

export const ProgressText = styled.text`
    x: 50%;
    y: 50%;
    font-size: 32px;
    font-weight: bold;
    fill: black;
    text-anchor: middle;
    dominant-baseline: middle;
`

export const ProgressResetText = styled(ProgressText)`
    font-size: 20px;
`

export const UncompletedCircle = styled.circle`
    stroke: ${color.primary};
    stroke-width: 16px;
    stroke-dasharray: 817 817;
`

export const CompletedCircle = styled.circle`
    stroke-width: 16px;
    stroke: ${color.text};
    stroke-dasharray: 817 817;
`

export const TodoContainer = styled.div`
    padding-right: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: center;
    margin: 0;
    min-width: 310px;
    width: 50%;
    padding-bottom: .8em;
    height: calc(100vh - 7em);
    overflow-y: auto;

    @media (max-width: 800px) {
        width: 80%;
        margin: 0 auto;
    }
`

export const TodoDecks = styled.div`
    min-height: 500px;
    margin-bottom: 1.5em;
    overflow-y: auto;
`

export const TodoPaper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: ${color.paperBackground};
    gap: 1em;
`

export const EmptyDeck = styled.div`
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
`

