import { signIn, signOut, useSession } from 'next-auth/react';

import './globals.css';

const IndexPage = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (session) {
    return (
      <div>
        Hello, {session!.user!.email ?? session!.user!.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
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
