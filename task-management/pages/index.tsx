import { signIn, signOut, useSession } from 'next-auth/react'

import './globals.css'
import Loading from './Loading'

import Login from './auth/Login'
import RootLayout from './layout'

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
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
        <Login />
      </div>
    )
  }
}
export default IndexPage
