import styled from "styled-components";
import { color } from "../../utils/styles";

export const AppHeaderMain = styled.div`
  max-height: 4em;
  background-color: ${color.select};
  padding-left: min(15vw, 5em);
  padding-right: min(5vw, 6em);
  display: flex;
  justify-content: space-between;
`;

export const AppHeaderText = styled.div`
  display: flex;
  justify-content: start;
  gap: 16px;
  align-items: center;
`;

export const AppHeaderControls = styled.div`
  display: flex;
  justify-content: end;
  gap: 1em;
  align-items: center;
`;
