import React, { RefObject, useRef } from 'react'
import { Plus, X } from "tabler-icons-react"
import { DeckBtn, DeckBtnCircular } from "../Decks/DeckBtn"
import { ClickableOverlay, ModalBtnContainer, ScrollOverlay, StyledModal } from "./Styles"
import useOnOutsideClick from '../../hooks/useOnOutsideClick'
import ReactDOM from "react-dom"
import {CSSTransition} from 'react-transition-group';
import useOnEscapePress from "../../hooks/useOnEscapePress"

interface ModalPropTypes {
    width: number,
    onClose: () => void,
    withCloseButton: boolean,
    renderContent: JSX.Element,
    isOpen: boolean
}
function Modal({width, onClose, withCloseButton, renderContent, isOpen}: ModalPropTypes) {
    const clickableRef = useRef() as RefObject<HTMLDivElement>
    const modalRef = useRef() as RefObject<HTMLDivElement>
    useOnOutsideClick(modalRef, clickableRef, onClose)
    useOnEscapePress(onClose)
    const root = document.getElementById('root')
    
  return (
      <>
      {ReactDOM.createPortal(
      <CSSTransition in={isOpen} timeout={300} unmountOnExit mountOnEnter classNames="modal">
        <ScrollOverlay>
          <ClickableOverlay ref={clickableRef}>
                  <StyledModal  width={width} ref={modalRef} isOpen>
                  {withCloseButton && 
                  <ModalBtnContainer>
                    <DeckBtn align control={<X size={16}/>} onClick={onClose}/>
                  </ModalBtnContainer>}
                  {renderContent}
                  </StyledModal>
          </ClickableOverlay>
        </ScrollOverlay>
      </CSSTransition>
    , root!)}
      </>
     
    
  )
}



export default Modal
