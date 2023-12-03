import { signIn, signOut, useSession } from 'next-auth/react'

import './globals.css'
import Loading from './Loading'

import Login from './auth/Login'

const IndexPage = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (session) {
    return (
      <div>Main Page</div>
    )
  } else {
    signIn();
    return (
      <Loading />
    )
  }
}
export default IndexPage
