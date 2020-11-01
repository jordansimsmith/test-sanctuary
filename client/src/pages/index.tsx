import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Test Sanctuary</h1>

        <p className={styles.description}>
          Get started by selecting an institution.
        </p>
      </main>
    </div>
  );
};

export default Home;
