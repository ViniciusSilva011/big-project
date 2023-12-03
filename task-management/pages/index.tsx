import { signIn, signOut, useSession } from 'next-auth/react'

import './globals.css'
import Loading from './Loading'

import Login from './auth/Login'
import RootLayout from './layout'
import { ReactNode } from 'react'

const IndexPage = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (session) {
    return (
      <RootLayout>
        <div>Main Page</div>
      </RootLayout>
    )
  } else {
    signIn();
    return (
      <Loading />
    )
  }
}
export default IndexPage;

IndexPage.getLayout = (page: ReactNode) => {
  return (
    <>
      {page}
    </>
  )
}
