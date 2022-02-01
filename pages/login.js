import Head from 'next/head';
import styles from '../styles/Login.module.css';

const Login = () => {
  return (
    <div>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <a className={styles.logoLink} href='/'>
              <div className={styles.logoWrapper}>NEXTFLIX</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
