import React from 'react'
import {useState, useRef} from 'react'
import {Tabs, TextInput, Group} from '@mantine/core'
import {useForm} from '@mantine/form'
import Login from './Login'
import Register from "./Register"

function AccountAuth({curr = 1}: {curr: number}): JSX.Element {
  const [active, setActive] = useState(curr)

  return (
    <div>
      <div className="auth-header">
        <div className="auth-tabs">
          <Tabs active={active} onTabChange={setActive}>
            <Tabs.Tab label="Register"><Register/></Tabs.Tab>
            <Tabs.Tab label="Login"><Login/></Tabs.Tab>
          </Tabs>
        </div>
      </div>
      <div className="auth-container">
        
      </div>
      
    </div>
  )
}

export default AccountAuth