import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Logowanie',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        try {
          const response = await fetch(baseUrl + '/api/v1/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          const data: { access_token: string } = await response.json();

          if (!response.ok) {
            throw response;
          }
          console.log(response);
          return { accessToken: data?.access_token };
        } catch (error) {
          if (error instanceof Response) {
            return null;
          }
          console.log(error);
        }

        throw new Error('An error has occurred during login request');
      },
    }),
  ],
  // callbacks: {
  // jwt: async ({ token, user }) => {
  //   user && (token.user = user);
  //   return token;
  // },
  // session: async ({ session, token }) => {
  //   session.user = token.user; // Setting token in session
  //   return session;
  // },
  // },
  // pages: {
  //   signIn: '/login', //Need to define custom login page (if using)
  // },
  // session: {
  //   strategy: 'jwt',
  //   maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  // },
};
