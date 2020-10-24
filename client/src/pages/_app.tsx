import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import withApollo from 'next-with-apollo';
import App from 'next/app';
import { Header } from '../components/Header';
import 'antd/dist/antd.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: 'http://localhost:5000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
    }),
)(MyApp);
