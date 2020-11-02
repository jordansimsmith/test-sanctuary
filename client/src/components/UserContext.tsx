import { createContext } from 'react';
import { UserContextType } from '../types/types';

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
});
