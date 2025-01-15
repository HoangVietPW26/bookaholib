import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

const Header = () => {

  return (
    <header className='my-10 flex justify-between gap-5'>
        <Link href="/">
        <Image src="/icons/logo.svg" alt='logo' width={40} height={40}></Image>
        </Link>
        <ul className='flex flex-row itemscenter gap-8'>
        <form 
          action={async () => {
              'use server'
              await signOut()
          }} 
          className='mb-10'
          >
              <Button>Logout</Button>
        </form>
        </ul>
    </header>
  )
}

export default Header