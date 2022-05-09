import React, {useState} from 'react'
import {useForm} from '@mantine/form'
import {TextInput, Group, PasswordInput, Button, Center} from '@mantine/core'
import {useNavigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useOnFulfilled } from "../../shared/hooks/useOnFulfilled"
import { apiRequest } from "../../redux/reducers/api"
import { TestButton } from "../../shared/components/Button/Styles"
import RectangleBtn from "../../shared/components/Button/RectangleBtn"

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {isFulfilled} = useOnFulfilled()
  const api = useAppSelector(state => state.api)
  const form = useForm({
    initialValues: {
      username : '',
      password: ''
    },
    validate: {
      username: (value) => value.length === 0 ? "Username must not be empty" : null,
      password: (value) => value.length < 8 ? "Invalid password" : null,

    }
  })

  const handleSubmit = async () => {
    const body = {url: 'loginAuth', method: 'POST', data: form.values, type: 'VERIFY'}
    isFulfilled(apiRequest, body, () => {
      navigate('/u/home')
    })
     
      
  }
  
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div style={{height: 12}}>
          {api.error && <p style={{color: 'red'}}>Username or password is incorrect.</p>}
        </div>
        <div style={{paddingTop: 8}}>
            <TextInput sx={{height: 75}} label="Username" {...form.getInputProps('username')}/>
        </div>
        <div style={{paddingTop: 16}}>
            <PasswordInput sx={{height: 75}} label="Password" {...form.getInputProps('password')}/>
        </div>
            
        <div style={{paddingTop: 20}}>
         <Center>
          <Button loading={api.loading === "pending"} sx={{}}type="submit" color="#79a4db" size="md">
          Submit
          </Button>
        </Center>
        </div>
        </form>
    </div>
  )
}

export default Login