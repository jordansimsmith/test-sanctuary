import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Header } from '../components/Header';
import { useApollo } from '../lib/graphql/apolloClient';
import 'antd/dist/antd.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
