import React, {useState} from 'react'
import {Button} from '@mantine/core'
import { useNavigate } from "react-router-dom";
import {useAppSelector} from '../../redux/store'
import { BtnContainerRegister, HeaderContainer, TitleContainer, TitleText, TitleTextContainer } from "./Styles";
import AuthModal from "./Authentication/AuthModal";
import { createQueryModal } from "../../shared/utils/queryModal";
import Modal from '../../shared/components/Modal/Modal'

function Header() {
  const navigate = useNavigate()
  const auth = useAppSelector(state => state.auth)
  const authModal = createQueryModal('auth-modal')

  const handleStart = () => {
    if (!auth.user) {
      authModal.open()
    } else {
      navigate('/u/home', {state: {"prevURL": "/"}})
    }
    
  }
  return (
      <>
        <HeaderContainer>
            <h1 data-id="header">Spaced</h1>
            {!auth.user ? <p data-id="login-btn" onClick={() => authModal.open()}>Login</p> : <p>Welcome back {auth.user}</p>}
            <Modal
              width={400}
              onClose={authModal.close}
              withCloseButton={true}
              isOpen={authModal.isOpen()}
              renderContent={<AuthModal curr={1}/>}
            />
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