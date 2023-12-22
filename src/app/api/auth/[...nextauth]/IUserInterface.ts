export interface IUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  access_token: string;
}

export interface IAuthorizationResult {
  access_token?: string;
  user?: IUser;
  message?: string;
  status: boolean;
}
