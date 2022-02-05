import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './navbar.module.css';
import { magic } from '../../lib/magic-client';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [didToken, setDidToken] = useState('');

  const router = useRouter();

  useEffect(async () => {
    try {
      const { email, issuer } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken();

      if (email) {
        setUsername(email);
        setDidToken(didToken);
      }
    } catch (err) {
      console.error('Something retrieving email', err);
    }
  }, []);

  const handleLinkHome = e => {
    e.preventDefault();
    router.push('/');
  };

  const handleLinkMyList = e => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = e => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async e => {
    e.preventDefault();

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${didToken}`,
          'Content-Type': 'application/json'
        }
      });

      const res = await response.json();
    } catch (error) {
      console.error('Error logging out', error);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>NEXTFLIX</div>
        </a>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleLinkHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleLinkMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>
                {username}
                <Image
                  className={styles.iconExpandMore}
                  src='/static/expand_more.svg'
                  width='24px'
                  height='24px'
                  alt='expand dropdown'
                />
              </p>
            </button>
            {/** Expand dropdown */}
            <div>
              {showDropdown && (
                <div className={styles.navDropdown}>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
