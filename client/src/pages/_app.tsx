import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Header } from '../components/Header';
import { useApollo } from '../lib/graphql/apolloClient';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import { UserContext } from '../components/UserContext';
import { useFetchUser } from '../lib/auth/user';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { user, loading } = useFetchUser();
  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={{ user, loading }}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
