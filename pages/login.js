import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { magic } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* 
    When a user clicks submit, isLoading switches back to false a second 
    before the route sends them. It works but the user might click it
    right before the redirect happens. The useEffect fixes this unwanted behavior.
  */
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = e => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async e => {
    e.preventDefault();
    if (email) {
      if (email === 'johnwells.developer@gmail.com') {
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({ email });
          console.log({ didToken });

          if (didToken) {
            router.push('/');
          }
        } catch (err) {
          console.error('Something went wrong logging in', err);
          setIsLoading(false);
        }
      } else {
        setUserMsg("You don't have login access");
        setIsLoading(false);
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
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
