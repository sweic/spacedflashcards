import React from "react";
import TodoDeck from "../../../shared/components/Decks/TodoDeck";
// import TodoDeck from '../../../components/Dashboard/TodoDeck'
import { useAppSelector } from "../../../redux/store";
import { TodoDeckType } from "../../../shared/types/dashboard";
import { timeTillReset } from "../../../shared/utils/date-check";
import {
  ProgressCircle,
  ProgressText,
  UncompletedCircle,
  CompletedCircle,
  TodoContainer,
  TodoDecks,
  TodoPaper,
  EmptyDeck,
  DashboardContainer,
  ProgressResetText,
} from "./Styles";
import { Paper } from "@mantine/core";
import { Share } from "tabler-icons-react";
import { DeckBtnDangerous } from "../../../shared/components/Decks/DeckBtn";
function Dashboard() {
  const data = useAppSelector((state) => state.dataStore);

  return (
    <DashboardContainer data-id="home-dashboard">
      <ProgressCircle>
        <ProgressText
          data-id="home-dashboard-completion"
          x="50%"
          y="50%"
        >{`${data.dashboardData.currentCompletion} / ${data.dashboardData.total}`}</ProgressText>
        <ProgressResetText x="50%" y="65%">
          Resets in {timeTillReset()}
        </ProgressResetText>
        <UncompletedCircle cx="50%" cy="50%" r="130" />
        <CompletedCircle
          cx="50%"
          cy="50%"
          r="130"
          style={{
            strokeDashoffset: `${
              817 -
              (data.dashboardData.currentCompletion /
                data.dashboardData.total) *
                817
            }`,
          }}
        />
      </ProgressCircle>
      <TodoContainer>
        <h3 style={{ fontSize: "30px" }}>Todos</h3>
        <TodoDecks data-id="home-dashboard-todo">
          <Paper
            shadow="lg"
            withBorder
            p="md"
            style={{ backgroundColor: "#f4f5f7" }}
          >
            <TodoPaper>
              {data.dashboardData.decks.length === 0 && (
                <EmptyDeck>
                  <p>No decks to complete today!</p>
                </EmptyDeck>
              )}
              {data.dashboardData.decks.map((deck) => {
                const finder = data.decks.find(
                  (dataDeck) => dataDeck.id === deck.id
                );
                if (finder) {
                  const newDeck: TodoDeckType = { ...deck, ...finder };
                  const completion = `${newDeck.completion} / ${newDeck.count}`;
                  return <TodoDeck details={newDeck} completion={completion} />;
                }
              })}
            </TodoPaper>
          </Paper>
        </TodoDecks>
      </TodoContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
