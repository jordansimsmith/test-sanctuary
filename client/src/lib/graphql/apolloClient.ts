import {
  ApolloClient,
  concat,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';
import { getAccessToken } from '../auth/auth';
import jwtDecode from 'jwt-decode';

/**
 * Next.js Apollo integration sourced from the official example
 * https://github.com/vercel/next.js/tree/canary/examples/with-apollo
 */

let apolloClient: ApolloClient<NormalizedCacheObject>;
let accessToken: string;

const authLink = setContext(async (_req, { headers }) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!accessToken) {
    // fetch token
    console.log('access_token missing, fetching from server');
    accessToken = await getAccessToken();
  } else {
    const { exp } = jwtDecode(accessToken);
    const expiryTimeMs = exp * 1000 - 60000; // account for latency
    if (Date.now() >= expiryTimeMs) {
      // fetch token
      console.log('access_token expired, fetching from server');
      accessToken = await getAccessToken();
    }
  }

  if (!accessToken) {
    return;
  }

  const authorization = `Bearer ${accessToken}`;
  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_BASE}/graphql`,
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authLink, uploadLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState = null,
): ApolloClient<NormalizedCacheObject> => {
  const client = apolloClient ?? createApolloClient();

  // merge cache
  if (initialState) {
    const existingCache = client.extract();

    client.cache.restore({ ...existingCache, ...initialState });
  }

  // always create a new client for SSR/SSG
  if (typeof window === 'undefined') {
    return client;
  }

  // singleton instance
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
};

export const useApollo = (
  initialState = null,
): ApolloClient<NormalizedCacheObject> => {
  const client = useMemo(() => initializeApollo(initialState), [initialState]);
  return client;
};
