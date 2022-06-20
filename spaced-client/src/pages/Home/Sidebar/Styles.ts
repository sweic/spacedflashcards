import styled from "styled-components";
import { Menu2 } from "tabler-icons-react";
import { color } from "../../../shared/utils/styles";
export interface SidebarContainerProps {
  sidebarExpanded: boolean;
}

export interface isSelected {
  selected: boolean;
}

export const SidebarButton = styled(Menu2)`
  @media (max-width: 900px) {
    position: absolute;
    top: 20px;
    left: 1em;
    cursor: pointer;
  }

  @media (min-width: 901px) {
    display: none;
  }
`;

export const SidebarContainer = styled.div<SidebarContainerProps>`
  z-index: 100;
  overflow-y: auto;
  margin: 0;
  width: 250px;
  height: calc(100vh - 4em);
  background-color: ${color.primarybg};

  > ul {
    list-style-type: none;
    padding-top: 2em;
  }

  > ul li {
    cursor: pointer;
    padding-left: min(2em, 3vw) !important;
    padding: 1em 0.5em 1em 0.5em;
    font-size: 1.1rem;
    display: flex;
    gap: 0.5em;
  }

  @media (max-width: 900px) {
    overflow-y: hidden;
    position: absolute;
    width: ${(props) => (props.sidebarExpanded ? "250px" : "0px")} !important;
    transform: translateX(-100%);
    transform: ${(props) =>
      props.sidebarExpanded ? "translateX(0%)" : "translateX(-100%)"};
    transition: 350ms ease-out;
  }
`;

export const SidebarList = styled.ul`
  list-style-type: none;
  padding-top: 2em;
`;

export const SidebarItem = styled.li<isSelected>`
  color: ${(props) => props.selected && "white"};
  font-weight: ${(props) => props.selected && "bold"};
  background-color: ${(props) => props.selected && color.primary};

  &:hover {
    color: white;
    font-weight: bold;
    background-color: ${color.primary};
  }
`;
