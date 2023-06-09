import { randomUUID } from 'crypto';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const NavBar = () => {
  const menus = [
    { title: 'Home', link: '/' },
    { title: 'Profile', link: '/profile' },
    { title: 'Tasks', link: '/tasks' },
  ];

  const renderMenu = menus.map((menu) => {
    console.log(menu);
    return (
      <Link href={menu.link} key={crypto.randomUUID()}>
        <span className='mr-2'>{menu.title}</span>
      </Link>
    );
  });

  return (
    <menu>
      <nav className=' flex justify-between text-blue-200'>{renderMenu}</nav>
    </menu>
  );
};

export default NavBar;
