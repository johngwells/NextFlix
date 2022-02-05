import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';

import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos
} from '../lib/videos';
import useRedirectUser from '../utils/redirectUser';

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);

  const disneyVideos = await getVideos('disney trailer');
  const animeVideos = await getVideos('anime trailer');
  const popularVideos = await getPopularVideos();
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  return {
    props: { disneyVideos, animeVideos, popularVideos, watchItAgainVideos }
  };
}

export default function Home({
  disneyVideos,
  animeVideos,
  popularVideos,
  watchItAgainVideos = []
}) {
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
          videoId='T9o-bx1KMpQ'
          title='Lord of the Rings'
          subTitle='Mordor'
          imgUrl='/static/Lordoftherings.jpeg'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards
            title='Watch it again'
            videos={watchItAgainVideos}
            size='small'
          />
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
