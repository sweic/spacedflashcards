import React from 'react'
import {useState, useRef} from 'react'
import {Tabs, TextInput, Group} from '@mantine/core'
import {useForm} from '@mantine/form'
import Login from './Login'
import Register from "./Register"
import { AuthHeader, AuthTabs } from "./Styles"

function AuthModal({curr = 1}: {curr: number}): JSX.Element {
  const [active, setActive] = useState(curr)

  return (
      <AuthHeader>
          <AuthTabs>
            <Tabs active={active} onTabChange={setActive}>
                <Tabs.Tab label="Register"><Register/></Tabs.Tab>
                <Tabs.Tab label="Login"><Login/></Tabs.Tab>
            </Tabs>
          </AuthTabs>
      </AuthHeader>
      
  )
}

export default AuthModal