
// import { Link } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export const Notfound = () => {
  return (
    <>
    <h1 className='text-center text-5xl mt-6'>404 Not Found</h1>
    <div className='flex justify-center max-w-[80vw]'>
      
      <Image src="/nf.png" alt='' width={500} height={300} />

    </div>
    <Link href="/" className='no-underline text-white'><h3 className='text-center text-2xl'>Ir a menu principal</h3></Link>
    </>
  )
}


export default Notfound