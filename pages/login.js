import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import styles from '../styles/Login.module.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const handleOnChangeEmail = e => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = e => {
    e.preventDefault();
    if (email) {
      if (email === 'johnwells@google.com') {
        // route to dashboard
        router.push('/');
        setUserMsg('verified! routing to dashboard...')
      } else {
        // show error
        setUserMsg('You don\'t have login access');
      }
    } else {
      setUserMsg('Enter a valid email address');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href='/'>
            <div className={styles.logoWrapper}>NEXTFLIX</div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign in</h1>

          <input
            type='text'
            placeholder='Email address'
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
