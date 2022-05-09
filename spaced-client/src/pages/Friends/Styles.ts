import styled from 'styled-components'
import { color } from "../../shared/utils/styles"


export const FriendsContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 4em);
    padding-top: .8em;
    display: flex;
    flex-direction: column;
    gap: 1em;

    @media (max-width: 800px) {
        width: 99%;
    }
`

export const FriendsContent = styled.div`
    width: 90%;
    margin: 0 auto;
`

export const ActivityListContainer = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    height: 600px;
    padding: 1em;
`
export const ActivityComponent = styled.div`
    display: flex;
    align-items: center;
    min-height: 120px;
    gap: 2em;
    justify-content: space-between;
`

export const ActivityMain = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    padding-left: 1em;
`

export const ActivityContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        padding-top: 0.5em;
    }
`

export const ActivityControllers = styled.div`
    margin-right: 1em;
    display: flex;
    align-items: center;
    gap: 1.5em;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`

export const SearchComponent = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    height: 80px;
    padding: 1em;
    width: 100%;
`