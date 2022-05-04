import React, {useEffect} from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/store'
import '../../styles/dashboard.css'
import { timeTillReset } from "../../utils/date-check"
import {Paper} from '@mantine/core'
import { TodoDeckType } from "../../types/dashboard"
import TodoDeck from "./TodoDeck"



function Dashboard() {

  const data = useAppSelector(state => state.dataStore)

  return (
      <div className="dashboard-container">
        <div className="completion-container">
          <svg className="progress-circle-svg" >
            <text x="50%" y="50%" className="progress-percentage">{data.dashboardData.currentCompletion} / {data.dashboardData.total} 
            </text>
            <text x="50%" y="65%"  className="reset-text">Resets in {timeTillReset()}</text>     
            <circle className="uncompleted-circle" cx="50%" cy="50%" r="130"/>
            <circle className="progress-circle" cx="50%" cy="50%" r="130" style={{strokeDashoffset: `${817 - (data.dashboardData.currentCompletion / data.dashboardData.total) * 817}`}}/>
          </svg>
        </div>
        <div className="todo-container">
          <h3 style={{fontSize: '30px'}}>Todos</h3>
          <div className="todo-deck-container">
            <Paper shadow="md" p="md" withBorder className="todo-paper">
            {data.dashboardData.decks.length === 0 && <div style={{minHeight: '280px', display: 'flex', alignItems: "center", justifyContent:"center"}}><p>No decks to complete today!</p></div>}
              {data.dashboardData.decks.map((deck) => {
                const finder = data.decks.find((dataDeck) => dataDeck.id === deck.id)
                if (finder) {
                  const newDeck: TodoDeckType = {...deck, ...finder}
                  const completion = `${newDeck.completion} / ${newDeck.count}`
                  return <TodoDeck details={newDeck} completion={completion}/>
                }
              })}
            </Paper>
          </div>
        </div>
      </div>
  )
}

export default React.memo(Dashboard)