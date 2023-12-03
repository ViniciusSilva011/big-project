import Header from '@/app/components/menu/Header'
import { TasksProvider } from '@/app/contexts/TasksContext'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import RootLayout from './layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TasksProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </TasksProvider>
    </SessionProvider>
  )
}
