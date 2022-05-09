import styled from 'styled-components'

export const Rowbox = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`

export const Columnbox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const RowboxCentered = styled(Rowbox)`
    align-items: center;
    height: 100%;
`

export const ColumnboxCentered = styled(Columnbox)`
    align-items: center;
    height: 100%;
`