import { signIn, signOut, useSession } from 'next-auth/react';

import './globals.css';
import Header from '@/app/components/Header';
import Loading from './Loading';

const IndexPage = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }
  if (session) {
    const userLoggedName = session?.user?.name ?? '';
    return (
      <div className='m-3'>
        <Header user={userLoggedName} />
        <main className='flex min-h-screen items-center justify-center'></main>
      </div>
    );
  } else {
    return (
      <div>
        You are not logged in! <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};
export default IndexPage;
