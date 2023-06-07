'use client';
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from './components/buttons.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../utils/authOptions';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') return <>teste</>;
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  );
}
