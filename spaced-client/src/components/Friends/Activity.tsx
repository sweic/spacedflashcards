import { Paper } from "@mantine/core"
import React from 'react'
import { Check, Checks, Share, TableImport, Trash, UserCheck, UserPlus } from "tabler-icons-react"
import { useSocialAPI } from "../../hooks/useSocial"
import { UserActivityNotification, UserActivityType } from "../../types/social"

function Activity({deploySocial, variables, activity}: {deploySocial: any, variables: any, activity: UserActivityNotification}) {
  return (
    <Paper p="md" withBorder shadow="md" className="activity-component">
                <div className="activity-main">
                  {renderIcon(activity.type)}
                  <div className="activity-content">
                    {renderActivityDetails(activity)}
                </div>
                </div>
                <div className="activity-controllers">
                  {activity.type === 'REQUEST' || activity.type === 'SHARE' ? <Check className="deck-btn-edit" size={30} style={{cursor: 'pointer'}} onClick={() => deploySocial({...variables, type: activity.type === 'SHARE' ? 'IMPORT' : 'ACCEPT'})}/> : null }
                  <Trash onClick={() => deploySocial({
                    ...variables, type: "DELETE"
                  })} className="deck-btn-delete" size={30}style={{cursor: 'pointer'}}/>
                </div>
              </Paper>
  )
}

export default Activity


const renderActivityDetails = (activity: UserActivityNotification) => {
  var activityTitle: string = '';
  var activityDetails: string = '';
  
  switch(activity.type) {
    case 'ACCEPT':
      activityTitle = 'New Friend';
      activityDetails = `You have accepted ${activity.to}'s friend request`
      break
    case 'ACCEPTED':
      activityTitle = 'New Friend'
      activityDetails = `${activity.to} has accepted your friend request`
      break
    case 'REQUEST':
      activityTitle = 'Friend Request';
      activityDetails = `${activity.from} has requested to be your friend`
      break
    case 'IMPORTED':
      if (!activity.deck) break
      activityTitle = 'New Deck';
      activityDetails = `You have imported ${activity.from}'s deck titled ${activity.deck.title}`
      break
    case 'SHARE':
      if (!activity.deck) break
      activityTitle = 'Deck Share'
      activityDetails = `${activity.from} would like to share his deck titled ${activity.deck.title} to you.`
      break
    case 'COMPLETE':
      activityTitle = 'Dailies completed'
      activityDetails = `${activity.from} has completed their daily flashcards!`
      break;

  }
  
    return (
      <>
        <h3>{activityTitle}</h3>
        <p>{activityDetails}</p>
      </>
    )
  }

  
  const renderIcon = (type: UserActivityType) => {
    switch(type) {
      case 'COMPLETE':
        return <Checks/>
      case 'REQUEST':
        return <UserPlus/>
      case 'ACCEPT':
        return <UserCheck/>
      case 'ACCEPTED':
        return <UserCheck/>
      case 'SHARE':
        return <Share/>
      case 'IMPORTED':
        return <TableImport/>
      
    }
  }
  