import { signIn, signOut, useSession } from 'next-auth/react';

import './globals.css';
import Header from '@/app/components/Header';
import Loading from './Loading';
import NavBar from '@/app/components/NavBar';
import Login from './auth/Login';

const IndexPage = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }
  if (session) {
    const userLoggedName = session?.user?.name ?? '';
    return (
      <div className='m-3'>
        <NavBar user={userLoggedName} />
        <main className='min-h-screen mt-5'>
          <header className='bg-white shadow'>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'></div>
          </main>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
        <Login />
      </div>
    );
  }
};
export default IndexPage;
