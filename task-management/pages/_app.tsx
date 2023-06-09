import { TasksProvider } from '@/app/contexts/TasksContext'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TasksProvider>
        <Component {...pageProps} />
      </TasksProvider>
    </SessionProvider>
  )
}
