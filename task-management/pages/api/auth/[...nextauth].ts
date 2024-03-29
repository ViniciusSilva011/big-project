import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Email from 'next-auth/providers/email';
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// we will define `options` up next

const smtpHost = process.env.SMTP_HOST!;
const smtpPort = parseInt(process.env.SMTP_PORT!);
const smtpUser = process.env.SMTP_USER!;
const smtpPassword = process.env.SMTP_PASSWORD!;
const smtpFrom = process.env.SMTP_FROM!;


export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch("/auth/login", {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" }
    //     })
    //     const user = await res.json()

    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user
    //     }
    //     // Return null if user data could not be retrieved
    //     return null
    //   }
    // }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Email({
      server: {
        host: smtpHost,
        port: smtpPort,
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: smtpFrom,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      const user = await prisma.user.findFirst({
        where: {
          email: token.email
        },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true
                    }
                  }
                }
              }
            },
          }
        }
      });

      token.id = user?.id;
      token.roles = user?.roles;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.roles = token.roles as Role[]
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET!,
}

export default NextAuth(authOptions)
  ;
