import React from "react";
import { Drawer, Button } from "@mantine/core";
import OverviewCard from "./OverviewCard";
import { OverviewPropsTypes } from "../../types/props";
import { Gap, OverviewContainer } from "./Styles";

function Overview({ appProps }: { appProps: OverviewPropsTypes }) {
  const { overviewOpened, setOverviewOpened, jumpHandler, deck } = appProps;
  return (
    <>
      <Drawer
        data-id="create-overview"
        title={
          <h3 data-id="create-overview-header" style={{ paddingLeft: ".6em" }}>
            Deck Overview
          </h3>
        }
        size="xl"
        padding="md"
        opened={overviewOpened}
        onClose={() => setOverviewOpened(false)}
      >
        <OverviewContainer>
          {deck.map((card, idx) => {
            return (
              <OverviewCard
                cardInfo={card}
                idx={idx}
                jumpHandler={jumpHandler}
              />
            );
          })}
          <Gap />
        </OverviewContainer>
      </Drawer>
    </>
  );
}

export default Overview;
