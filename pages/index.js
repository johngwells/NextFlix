import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';

import { getVideos } from '../lib/videos';

export async function getServerSideProps() {
  const videos = getVideos();

  return { props: { videos } };
}

export default function Home({ videos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextFlix App</title>
        <meta name='description' content='NextJS Netflix app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <NavBar username='johnny@google.com' />
        <Banner
          title='Lord of the Rings'
          subTitle='Mordor'
          imgUrl='/static/Lordoftherings.jpeg'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={videos} size='large' />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title='Classics' videos={videos} size='medium' />
        </div>
      </main>
    </div>
  );
}
