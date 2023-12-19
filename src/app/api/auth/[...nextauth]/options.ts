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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id;
      }
      return token;
    },
    // async jwt({ token, account, user }) {
    //   if (user) {
    //     token.user = user;
    //     token.accessToken = user.access_token;
    //   }
    //   return token;
    // },
    // async session({ session, token }: { session: any; token: any }) {
    //   session.address = token.sub;
    //   session.user.name = token.sub;
    //   session.user.image = 'https://www.fillmurray.com/128/128';
    //   return session;
    // },
    // async session({ session, token }) {
    //   session.accessToken = token.access_token;
    //   session.user = token.user;
    //   return session;
    // },
  },
};
