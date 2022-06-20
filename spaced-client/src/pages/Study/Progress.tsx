import React from "react";
import { ProgressPropsTypes } from "../../shared/types/props";
import { CurrentBar, MaxBar, ProgressBar } from "./Styles";

function Progress({ appProps }: { appProps: ProgressPropsTypes }) {
  const { currCardRef, cards } = appProps;
  return (
    <ProgressBar>
      <MaxBar />
      <CurrentBar
        data-id="study-progress-bar"
        currentWidth={((currCardRef.current + 1) / cards.length) * 100}
      />
    </ProgressBar>
  );
}

export default React.memo(Progress);
