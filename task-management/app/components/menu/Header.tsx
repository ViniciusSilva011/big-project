'use client';

import NavBar from './NavBar';

const Header = ({ user = '' }) => {
  return <NavBar user={user} />;
};

export default Header;
