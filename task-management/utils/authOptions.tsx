import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials, req) {
        if (
          credentials?.email == 'admin@example.com' &&
          credentials?.password == 'admin'
        )
          return { id: '1', name: 'Admin', email: 'admin@admin.com' };
      },
    }),
  ],
};
