import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';

/**
 * Next.js Apollo integration sourced from the official example
 * https://github.com/vercel/next.js/tree/canary/examples/with-apollo
 */

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      uri: 'http://localhost:5000/graphql',
    }),
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
