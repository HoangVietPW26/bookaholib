import React from 'react'
import { ReactNode } from 'react'
import Image from 'next/image'
const layout = ({children}: {children: ReactNode}) => {
  return (
   <main className='auth-container'>
    <section className='auth-form'>
        <div className='auth-box'>
            <div className='flex flex-row gap-2'>
            <Image src="/icons/logo.svg" alt='logo' width={27} height={27}/>
            <h1 className='text-2xl font-semibold text-white'>Bookaholib</h1>
            </div>
            <div>{children}</div>
        </div>

    </section>

    <section className='auth-illustration'>
        <Image src="/images/auth-illustration.png" alt='auth illustration' height={1000} width={1000} className='size-full object-cover'/>

    </section>

   </main>
  )
}

export default layout