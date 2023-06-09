'use client';
import Image from 'next/image';
import NavBar from './NavBar';
import { signOut } from 'next-auth/react';

const Header = ({ user = '' }) => {
  return (
    <div className='flex items-center justify-between '>
      <NavBar />

      <div className=''>
        <div className='flex items-center justify-items-center'>
          <div className='block'>
            <p>{user}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>

          <Image
            src={
              'https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg'
            }
            width='384'
            height='512'
            alt={''}
            className='w-12 h-12 rounded-full mx-auto ml-2'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
