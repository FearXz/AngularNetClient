import { User } from './User';

export interface LoginResponse {
  accessToken: string;
  duration: number;
  refreshToken: string;
}
