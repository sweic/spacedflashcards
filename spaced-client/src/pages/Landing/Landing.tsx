import React, { useState, useRef, useEffect, RefObject } from "react";
import ReactDOM from "react-dom";
import Modal from "../../shared/components/Modal/Modal";
import Header from "./Header";
import { LandingBody, StepsContainer } from "./Styles";

function Landing() {
  return (
    <LandingBody>
      <Header />
      <StepsContainer></StepsContainer>
    </LandingBody>
  );
}

export default Landing;
