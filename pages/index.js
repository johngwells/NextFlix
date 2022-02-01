import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';

import { getPopularVideos, getVideos } from '../lib/videos';
import { magic } from '../lib/magic-client';

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer');
  const animeVideos = await getVideos('anime trailer');

  const popularVideos = await getPopularVideos();

  return { props: { disneyVideos, animeVideos, popularVideos } };
}

export default function Home({ disneyVideos, animeVideos, popularVideos }) {
  console.log({ magic })
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
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title='Anime' videos={animeVideos} size='medium' />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title='Popular' videos={popularVideos} size='small' />
        </div>
      </main>
    </div>
  );
}
