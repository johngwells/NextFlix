import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';

import { getPopularVideos, getVideos, getWatchItAgainVideos } from '../lib/videos';

export async function getServerSideProps() {
  const userId = 'did:ethr:0x731A83336DF8568393405Ed30F3F7F77E07B8060'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDczMUE4MzMzNkRGODU2ODM5MzQwNUVkMzBGM0Y3Rjc3RTA3QjgwNjAiLCJwdWJsaWNBZGRyZXNzIjoiMHg3MzFBODMzMzZERjg1NjgzOTM0MDVFZDMwRjNGN0Y3N0UwN0I4MDYwIiwiZW1haWwiOiJqb2hud2VsbHMuZGV2ZWxvcGVyQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJpYXQiOjE2NDM5NDQzNzQsImV4cCI6MTY0NDU0OTE3NCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4NzMxQTgzMzM2REY4NTY4MzkzNDA1RWQzMEYzRjdGNzdFMDdCODA2MCJ9fQ.lJVV70w423gPzVpWjcy-CkvYh5y4aJEVd2nbrffuSi4'
  const disneyVideos = await getVideos('disney trailer');
  const animeVideos = await getVideos('anime trailer');
  const popularVideos = await getPopularVideos();
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  
  return { props: { disneyVideos, animeVideos, popularVideos, watchItAgainVideos } };
}

export default function Home({ disneyVideos, animeVideos, popularVideos, watchItAgainVideos }) {
  console.log(watchItAgainVideos)

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
          <SectionCards title='Watch it again' videos={watchItAgainVideos} size='small' />
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
