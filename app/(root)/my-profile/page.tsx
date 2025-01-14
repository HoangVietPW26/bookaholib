import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { sampleBooks } from '@/app/constants'
const page = async() => {
  return (
    <>
    <form action={async () => {
        'use server'
        await signOut()
    }} className='mb-10'>
        <Button>Logout</Button>
        <BookList title='Borrowed book' books={sampleBooks}/>
    </form>
    </>
        
  )
}

export default page