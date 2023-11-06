import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware"
import { getServerSession } from "next-auth";


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req, res) {
    // console.log('req.nextauth.token: ', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: async (s) => {
        // console.log('res :>> ', s.req.cookies.get('next-auth.session-token'));
        return !!s.req.cookies.get('next-auth.session-token');
      },
    },
  }
)
export const config = {
  matcher: '/api/:path*',
}