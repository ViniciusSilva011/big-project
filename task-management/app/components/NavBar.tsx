import { signOut } from 'next-auth/react';

const NavBar = () => {
  return (
    <menu>
      <nav className=' flex justify-between bg-blue-900'>
        <span className='mr-2'>Menu 1</span>
        <span className='mr-2'>Menu 2</span>
        <span className='mr-2'>Menu 3</span>
        <span className='mr-2'>Menu 4</span>
      </nav>
    </menu>
  );
};

export default NavBar;
