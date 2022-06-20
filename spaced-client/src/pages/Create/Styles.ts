import styled from "styled-components";
import { color } from "../../shared/utils/styles";

interface DayNodeProps {
  selected: boolean;
}
export const CreateContainer = styled.div`
  overflow-y: auto;
  height: calc(100% - 4em);
`;

export const TextEditorsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  overflow-y: auto !important;
  padding: 0em 1.5em;
  @media (max-width: 900px) {
    align-items: center;
    display: flex;
    flex-direction: column !important;
    padding: 0em 0.8em;
    justify-content: center;
    gap: 0.5em;
  }
`;

export const TextEditorBox = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;

  & * {
    color: black;
  }
  @media (max-width: 900px) {
    .ql-editor {
      max-width: 85vw;
    }
  }

  @media (min-width: 901px) {
    .ql-editor {
      max-width: 612px;
      min-height: 250px;
      max-height: 250px;
      overflow-y: scroll;
    }
  }
`;

export const CreateBtnBox = styled.div`
  color: white;
  align-items: center;
  margin-top: 1em !important;
  width: 330px;
  height: 60px;
  margin: 0 auto;
  background-color: #a5b8d1;
  border-radius: 2em;
  display: flex;
  justify-content: space-evenly;
`;

export const CreateDetailsContainer = styled.div`
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 1em !important;
  max-width: 400px;
  margin: 0 auto;
  min-height: 400px;
`;

export const CreateAdditionalOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5em;
  gap: 0.5em;

  position: relative;
`;

export const DayChooser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  justify-content: space-around;
`;

export const DayNode = styled.span<DayNodeProps>`
  cursor: pointer;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => (props.selected ? color.text : color.primary)};
  border-radius: 1.5em;
  color: white;
  font-weight: bold;
`;
