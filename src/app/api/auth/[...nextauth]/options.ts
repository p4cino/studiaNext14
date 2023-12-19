import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface IAuthorizationResult {
  accessToken?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  message?: string;
  status: boolean;
}

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
        console.log(baseUrl);

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
            return null;
          }

          const parsedResponse = await res.json();
          if (!parsedResponse.status) {
            throw new Error(`Authorization failed: ${parsedResponse.message}`);
          }

          console.log(parsedResponse);
          const data = {
            id: parsedResponse.user.id.toString(),
            jwt: parsedResponse?.access_token,
            ...credentials,
            user: parsedResponse?.user,
            message: parsedResponse?.message,
            status: parsedResponse?.status,
          };
          return data;
        } catch (e) {
          return null;
        }

        throw new Error('An error has occurred during login request');
      },
    }),
  ],
};
