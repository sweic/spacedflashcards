import React, {useState} from 'react'
import {Modal} from '@mantine/core'
import AccountAuth from "../Authentication/AuthModal";
import { useNavigate } from "react-router-dom";
import {useAppSelector} from '../../redux/store'

function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [authMode, setAuthMode] = useState<number>(1)
  const auth = useAppSelector(state => state.auth)

  
  const openLoginModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setAuthMode(1)
    setOpen(true)
  }

  const handleStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!auth.user) {
      setAuthMode(0)
      setOpen(true)
    } else {
      navigate('/u/home', {state: {"prevURL": "/"}})

    }
    
  }
  return (
    
      <div className="lead-container">
          <div className="header-container">
              <h1>Spaced</h1>
              {!auth.user ? <a onClick={(e) => openLoginModal(e)} href="/login">Login</a> : <p>Welcome back {auth.user}</p>}
              <Modal size="md" withCloseButton={false} opened={open} onClose={() => setOpen(false)}>
                <AccountAuth curr={authMode}></AccountAuth>
              </Modal>
          </div>
          <div className="title-container flex">
              <div className="title-text-container">
                  <h2 className="title-text">Create, review and share your flashcards! Built for students by students</h2>
                  <div className="btn-container-register"><button onClick={(e) => handleStart(e)} className="register-btn">{auth.user ? "Go to dashboard" : "Get started!"}</button></div>
              </div>

          </div>
      </div>
    
    
  )
}   

export default Header