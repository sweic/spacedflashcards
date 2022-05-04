import React, {useState} from 'react'
import {useForm} from '@mantine/form'
import {TextInput, Group, PasswordInput, Button, Center} from '@mantine/core'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { registerRequest } from "../../redux/reducers/auth"
import { useNavigate } from "react-router-dom"


function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const api = useAppSelector(state => state.api)


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

        const resultAction = await dispatch(registerRequest({form, navigate}))
       
      }
    
  return (
      
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group>
            <TextInput sx={{height: 75}}  label="First Name" {...form.getInputProps('firstName')}/>
            <TextInput sx={{height: 75}} label="Last Name" {...form.getInputProps('lastName')}/>
        </Group>
        <div style={{paddingTop: 16}}>
            <TextInput sx={{height: 75}} label="Email" {...form.getInputProps('email')}/>
        </div>
        <div style={{paddingTop: 16}}>
            <TextInput sx={{height: 75}} label="Username" {...form.getInputProps('username')}/>
            </div>
            <div style={{paddingTop: 16}}>
            <PasswordInput sx={{height: 75}} label="Password" {...form.getInputProps('password')}/>
            </div>
            <div style={{paddingTop: 16}}>
            <PasswordInput  sx={{height: 75}}label="Confirm Password" {...form.getInputProps('confirmPassword')}/>
        </div>
        <div style={{paddingTop: 20}}>
         <Center>
          <Button loading={api.loading === 'pending'} sx={{}}type="submit" color="#79a4db" size="md">
          Submit
          </Button>
        </Center>
        </div>
        </form>
    </div>
  )
}

export default Register