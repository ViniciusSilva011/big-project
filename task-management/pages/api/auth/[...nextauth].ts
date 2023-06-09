import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Email from 'next-auth/providers/email';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// we will define `options` up next

const smtpHost = process.env.SMTP_HOST!;
const smtpPort = parseInt(process.env.SMTP_PORT!);
const smtpUser = process.env.SMTP_USER!;
const smtpPassword = process.env.SMTP_PASSWORD!;
const smtpFrom = process.env.SMTP_FROM!;

export default NextAuth({
  providers: [
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
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET!,
});
