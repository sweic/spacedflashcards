import React, { forwardRef } from 'react'
import {DeckBtn as Button, DeckBtnDangerous as DangerousButton, DeckBtnCircular as CircularBtn} from './Styles'


export const DeckBtn = forwardRef(({control, onClick, children, align} : {control?: JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, children? : string, align?: boolean}, ref) => {
    return (
        <Button style={align ? {float: 'right'} : {alignSelf: 'start'}} onClick={onClick} ref={ref as React.RefObject<HTMLButtonElement>}>
            {control}
            {children}
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
