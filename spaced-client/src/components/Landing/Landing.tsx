import React, {useContext} from 'react'
import Header from "./Header"
import '../../styles/landing.css'
import { useAppModals } from "../../shared/hooks/useAppModals"



function Landing() {
  const {openAuthModal} = useAppModals()

  return (
    <div className="landing-body">
      <Header/>
      <div className="steps-container">
        <span onClick={() => openAuthModal(0)}>click me</span>
      </div>
    </div>
  )
}

export default Landing