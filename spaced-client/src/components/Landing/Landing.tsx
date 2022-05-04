import React, {useContext} from 'react'
import Header from "./Header"
import '../../styles/landing.css'



function Landing() {


  return (
    <div className="landing-body">
      <Header/>
      <div className="steps-container"></div>
    </div>
  )
}

export default Landing