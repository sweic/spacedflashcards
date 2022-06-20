import styled from "styled-components";
import { color } from "../../shared/utils/styles";

export const LandingBody = styled.div`
  height: 100%;
`;

export const StepsContainer = styled.div``;

export const HeaderContainer = styled.div`
  position: relative;
  height: 4em !important;
  background-color: ${color.primary};
  padding-left: min(15vw, 5em);
  padding-right: min(5vw, 6em);
  display: flex;
  justify-content: space-between;

  h1,
  p {
    color: white;
  }

  p {
    line-height: 4em;
    cursor: pointer;
  }

  h1 {
    line-height: 0.8em;
  }
`;
export const TitleContainer = styled.div`
  height: 450px;
`;
export const TitleTextContainer = styled.div`
    font-size: 1.75rem;
    padding-top: 1em;
    padding-left: min(5vw, 3em);
    max-width: 450px;
}
`;
export const TitleText = styled.h2`
  color: var(--light-text);
  text-align: center;
`;

export const BtnContainerRegister = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: center;
`;
