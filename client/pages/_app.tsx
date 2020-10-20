import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../styles/globals.css';

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default MyApp;
