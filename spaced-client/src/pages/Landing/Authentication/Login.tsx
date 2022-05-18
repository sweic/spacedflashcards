import React, {useEffect} from 'react'
import {useForm} from '@mantine/form'
import {TextInput, Group, PasswordInput, Button, Center} from '@mantine/core'
import {useNavigate} from 'react-router-dom'
import { apiRequest } from "../../../redux/reducers/api"
import { resetErrors } from "../../../redux/reducers/auth"
import { useAppSelector, useAppDispatch } from "../../../redux/store"
import { useOnFulfilled } from "../../../shared/hooks/useOnFulfilled"
import { ErrorContainer, FormFieldContainer } from "./Styles"

function Login() {
  const navigate = useNavigate()
  const {isFulfilled} = useOnFulfilled()
  const auth = useAppSelector(state => state.auth)
  const api = useAppSelector(state => state.api)
  const dispatch = useAppDispatch()
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
    const body = {url: 'loginAuth', method: 'POST', data: form.values, type: 'LOGIN'}
    isFulfilled(apiRequest, body, () => {
      navigate('/u/home')
    })
  }

  useEffect(() => {
    dispatch(resetErrors())
  }, [])
  
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
        <ErrorContainer>
         {auth.error.login && <p data-id="login-error" style={{color: 'red'}}>Username or password is incorrect.</p>}
        </ErrorContainer>
        <FormFieldContainer>
            <TextInput data-id="username-input" sx={{height: 75}} label="Username" {...form.getInputProps('username')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <PasswordInput data-id="password-input"sx={{height: 75}} label="Password" {...form.getInputProps('password')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <Center>
            <Button data-id="login-submit" loading={api.loading === "pending"} sx={{}}type="submit" color="#79a4db" size="md">
            Submit
            </Button>
            </Center>
        </FormFieldContainer>
        
    </form>
  )
}

export default Login