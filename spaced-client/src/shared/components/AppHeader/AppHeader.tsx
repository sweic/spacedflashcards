import React from "react";
import { ArrowLeft } from "tabler-icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { DynamicHeaderPropsTypes } from "../../types/props";
import AppHeaderControl from "./AppHeaderControl";
import { AppHeaderMain, AppHeaderText, AppHeaderControls } from "./Styles";

function AppHeader({ appProps }: { appProps: DynamicHeaderPropsTypes }) {
  const { headerName, displayBack } = appProps;
  const navigate = useNavigate();
  const location = useLocation() as any;

  const navigateHandler = () => {
    let nextContent = "dashboard";
    if (location.state.before) {
      switch (location.state.before) {
        case "dashboard":
          break;
        case "cards":
          nextContent = "cards";
          break;
        case "friends":
          nextContent = "friends";
          break;
      }
    }
    navigate("/u/home", { state: { content: nextContent } });
  };

  return (
    <AppHeaderMain>
      <AppHeaderText>
        {location.state && displayBack && (
          <ArrowLeft
            data-id="app-header-back-btn"
            onClick={(e) => navigateHandler()}
            style={{ cursor: "pointer" }}
            size={32}
            strokeWidth={3}
            color={"white"}
          />
        )}
        <h1 style={{ color: "white" }}>{headerName}</h1>
      </AppHeaderText>
      <AppHeaderControls>
        {headerName !== "create" && <AppHeaderControl />}
      </AppHeaderControls>
    </AppHeaderMain>
  );
}

export default AppHeader;
