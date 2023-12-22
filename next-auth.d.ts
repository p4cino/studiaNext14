import { JWT, Session, User } from 'next-auth/next';

import { IUser } from '@/api/auth/[...nextauth]/auth.config';

declare module 'next-auth' {
  interface Session extends Session {
    user: IUser & Session['user'];
  }
  interface User extends IUser {
    access_token: IUser['access_token'];
  }
  interface JWT {
    access_token: IUser['access_token'];
  }
  interface Token {
    access_token: IUser['access_token'];
  }
}
