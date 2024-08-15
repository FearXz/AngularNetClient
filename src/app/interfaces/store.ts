import { AUTH } from '../utils/const';
import { UserData } from './Interfaces';

export interface PStore {
  [AUTH]: UserData | null;
}
