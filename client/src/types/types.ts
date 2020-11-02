import { NormalizedCacheObject } from '@apollo/client';

export interface PageProps {
  initialApolloState?: NormalizedCacheObject;
}

export interface UserProfile {
  email: string | null | undefined;
  email_verified: boolean | null | undefined;
  name: string | null | undefined;
  nickname: string | null | undefined;
  picture: string | null | undefined;
  sub: string | null | undefined;
  updated_at: string | null | undefined;

  /** Any custom claim which could be in the profile */
  [key: string]: unknown;
}

export interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
}
