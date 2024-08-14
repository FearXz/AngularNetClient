import { AUTH } from '../utils/const';
import { LoginResponse } from './Interfaces';

export interface PStore {
  [AUTH]: LoginResponse | null;
}
