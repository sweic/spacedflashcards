import React, {useState} from 'react'
import {Button, Modal} from '@mantine/core'
import { useNavigate } from "react-router-dom";
import {useAppSelector} from '../../redux/store'
import { BtnContainerRegister, HeaderContainer, TitleContainer, TitleText, TitleTextContainer } from "./Styles";
import { DeckBtn } from "../../shared/components/Decks/DeckBtn";
import AuthModal from "./Authentication/AuthModal";

function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [authMode, setAuthMode] = useState<number>(1)
  const auth = useAppSelector(state => state.auth)

  
  const openLoginModal = () => {
    setAuthMode(1)
    setOpen(true)
  }

  const handleStart = () => {
    if (!auth.user) {
      setAuthMode(0)
      setOpen(true)
    } else {
      navigate('/u/home', {state: {"prevURL": "/"}})

    }
    
  }
  return (
      <>
        <HeaderContainer>
            <h1>Spaced</h1>
            {!auth.user ? <p onClick={() => openLoginModal()}>Login</p> : <p>Welcome back {auth.user}</p>}
            <Modal size="md" withCloseButton={false} opened={open} onClose={() => setOpen(false)}>
                <AuthModal curr={1}/>
            </Modal>
        </HeaderContainer>
        <TitleContainer>
            <TitleTextContainer>
                <TitleText>Create, review and share your flashcards! Built for students by students</TitleText>
                <BtnContainerRegister>
                    <Button onClick={() => handleStart()}>{auth.user ? "Go to dashboard" : "Get started!"}</Button>
                </BtnContainerRegister>
            </TitleTextContainer>
        </TitleContainer>
      </>
    
  )
}   

export default Header