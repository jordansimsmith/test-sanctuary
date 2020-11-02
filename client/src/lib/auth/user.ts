import { useEffect, useState } from 'react';
import { UserContextType, UserProfile } from '../../types/types';

export const fetchUser = async (): Promise<UserProfile | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_BASE}/api/me`);

  if (!res.ok) {
    return null;
  }

  const userProfile: UserProfile = await res.json();

  return userProfile;
};

export const useFetchUser = (): UserContextType => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchUser()
      .then((u) => setUser(u))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};
