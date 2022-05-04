import { Paper } from "@mantine/core"
import React from 'react'
import { Check, Checks, Trash, UserCheck, UserPlus } from "tabler-icons-react"
import { useSocial, useSocialAPI } from "../../hooks/useSocial"
import { useAppSelector } from "../../redux/store"
import { UserActivity, UserActivityNotification, UserActivityType } from "../../types/social"
import Activity from "./Activity"

function ActivityList() {
  const activityData = useAppSelector(state => state.social.activityHistory)
  const {deploySocial} = useSocialAPI()
  
  return (
    <div className="friends-content-container">
        <Paper  style={{backgroundColor: '#f4f5f7'}} withBorder shadow='md' className="activity-list">
          {activityData.map((activity, idx) => {
            const variables = {
              from: activity.from,
              to: activity.to,
              activityIdx: idx
            }
            return (
              <Activity deploySocial={deploySocial} variables={variables} activity={activity}/>
            )
          })}
        </Paper>
    </div>
  )
}

export default ActivityList

