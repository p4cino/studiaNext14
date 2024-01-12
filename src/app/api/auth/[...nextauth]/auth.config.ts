import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { IUser } from './IUserInterface';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Backend',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<IUser | null> {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        try {
          const res = await fetch(baseUrl + '/api/v1/login', {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const parsedResponse = await res.json();

          if (!parsedResponse.status) {
            throw new Error(`Authorization failed: ${parsedResponse.message}`);
          }

          return {
            id: parsedResponse.user.id.toString(),
            name: parsedResponse.user.name,
            email: parsedResponse.user.email,
            email_verified_at: parsedResponse.user.email_verified_at,
            created_at: parsedResponse.user.created_at,
            updated_at: parsedResponse.user.updated_at,
            access_token: parsedResponse.access_token,
          };
        } catch (error) {
          console.error('An error occurred during login request:', error);
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: 'light',
    brandColor: '#2196f3',
    logo: '/logo.png',
    buttonText: '',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
