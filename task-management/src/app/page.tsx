'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') return <>loading</>;
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>HOME</div>
    </main>
  );
}
