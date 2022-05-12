import React, {useEffect} from 'react'
import {useForm} from '@mantine/form'
import {TextInput, Group, PasswordInput, Button, Center} from '@mantine/core'
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../../../redux/reducers/api"
import { resetErrors } from "../../../redux/reducers/auth"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { useOnFulfilled } from "../../../shared/hooks/useOnFulfilled"
import { ErrorContainer, FormFieldContainer } from "./Styles"



function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {isFulfilled} = useOnFulfilled()
  const api = useAppSelector(state => state.api)
  const auth = useAppSelector(state => state.auth)

    const form = useForm({
        initialValues: {
          email: '',
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => value.length < 7 ? "Password must contain at least 8 characters" : null,
          confirmPassword: (value, values) => value != values.password ? "Passwords do not match" : null,
          username: (value) => value.length < 5 ? "Username must contain at least 6 characters" : null,
          firstName: (value) => value.length === 0 ? "First name cannot be empty" : null,
          lastName: (value) => value.length === 0 ? "Last name cannot be empty" : null,
        },
      });

    const handleSubmit = async () => {
      const body = {url: 'registerAuth', method: 'POST', data: form.values, type: 'REGISTER'}
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
            {auth.error.register && <p style={{color: 'red'}}>{auth.error.register} is taken!</p>}
        </ErrorContainer>
        <Group sx={{paddingTop: '1em'}} >
            <TextInput sx={{height: 75, flexGrow: '1'}}  label="First Name" {...form.getInputProps('firstName')}/>
            <TextInput sx={{height: 75, flexGrow: '1'}} label="Last Name" {...form.getInputProps('lastName')}/>
        </Group>
        <FormFieldContainer>
            <TextInput sx={{height: 75}} label="Email" {...form.getInputProps('email')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <TextInput sx={{height: 75}} label="Username" {...form.getInputProps('username')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <PasswordInput sx={{height: 75}} label="Password" {...form.getInputProps('password')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <PasswordInput  sx={{height: 75}}label="Confirm Password" {...form.getInputProps('confirmPassword')}/>
        </FormFieldContainer>
        <FormFieldContainer>
            <Center>
            <Button loading={api.loading === 'pending'} sx={{}}type="submit" color="#79a4db" size="md">
            Submit
            </Button>
            </Center>
        </FormFieldContainer>
    </form>
  )
}

export default Register