import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export interface IAuthorizationResult {
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

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Backend',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
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
            jwt: parsedResponse.access_token,
            ...credentials,
            user: parsedResponse.user,
            message: parsedResponse.message,
            status: parsedResponse.status,
          };
          return data;
        } catch (e) {
          return null;
        }

        throw new Error('An error has occurred during login request');
      },
    }),
  ],
  theme: {
    colorScheme: 'light', // "auto" | "dark" | "light"
    brandColor: '#2196f3', // Hex color code
    logo: '/logo.png', // Absolute URL to image
    buttonText: '', // Hex color code
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // pages: {
  // signIn: '/auth/signin',
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
};
