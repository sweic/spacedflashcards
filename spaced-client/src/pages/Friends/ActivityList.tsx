import { Paper } from "@mantine/core";
import React from "react";
import { useSocialAPI } from "../../shared/hooks/useSocial";
import { useAppSelector } from "../../redux/store";
import Activity from "./Activity";
import { ActivityListContainer, FriendsContent } from "./Styles";

function ActivityList() {
  const activityData = useAppSelector((state) => state.social.activityHistory);
  const { deploySocial } = useSocialAPI();

  return (
    <FriendsContent data-id="activity-list">
      <Paper
        style={{ backgroundColor: "#f4f5f7", marginTop: "1em" }}
        withBorder
        shadow="md"
      >
        <ActivityListContainer>
          {activityData.map((activity, idx) => {
            const variables = {
              from: activity.from,
              to: activity.to,
              activityIdx: idx,
            };
            return (
              <Activity
                deploySocial={deploySocial}
                variables={variables}
                activity={activity}
              />
            );
          })}
        </ActivityListContainer>
      </Paper>
    </FriendsContent>
  );
}

export default ActivityList;
