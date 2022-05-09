import React, { forwardRef } from 'react'
import {DeckBtn as Button, DeckBtnDangerous as DangerousButton, DeckBtnCircular as CircularBtn} from './Styles'


export const DeckBtn = forwardRef(({control, onClick} : {control: JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>}, ref) => {
    return (
        <Button onClick={onClick} ref={ref as React.RefObject<HTMLButtonElement>}>
            {control}
        </Button>
    )
})

export const DeckBtnDangerous = forwardRef(({control, onClick} : {control: JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>}, ref) => {
    return (
        <DangerousButton onClick={onClick} ref={ref as React.RefObject<HTMLButtonElement>}>
            {control}
        </DangerousButton>
    )
})

export const DeckBtnCircular = forwardRef(({control, onClick} : {control: JSX.Element, onClick?: React.MouseEventHandler<HTMLButtonElement>}, ref) => {
    return (
        <CircularBtn onClick={onClick} ref={ref as React.RefObject<HTMLButtonElement>}>
            {control}
        </CircularBtn>
    )
})
