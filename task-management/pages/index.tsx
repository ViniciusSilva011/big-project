import { signIn, signOut, useSession } from 'next-auth/react';

import './globals.css';
import Header from '@/app/components/Header';

const IndexPage = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (session) {
    const userLoggedName = session?.user?.name ?? '';
    return (
      <div className='m-3'>
        <Header user={userLoggedName} />
        <main className='flex min-h-screen flex-col items-center justify-between'>
          {'teste'}
        </main>
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
