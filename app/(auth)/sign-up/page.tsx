"use client"
import React from 'react'
import AuthForm from '@/components/AuthForm'
import { SignUpSchema } from '@/lib/validations'
const page = () => {
  return (
    <AuthForm
    type='SIGN_UP'
    schema={SignUpSchema}
    defaultValues={{
     email: '',
     password: '',
     fullname: '',
     universityId: 0,
     universityCard: ''
    }}
    onSubmit={()=>{}}
    />
  )
}

export default page