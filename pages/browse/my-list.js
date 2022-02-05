import Head from 'next/head';
import NavBar from '../../components/nav/navbar';
import SectionCards from '../../components/card/section-cards';

import styles from '../../styles/MyList.module.css';
import { getMyList } from '../../lib/videos';
import useRedirectUser from '../../utils/use-redirect-user';

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos
    }
  }
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards title='My List' videos={myListVideos} size='small' shouldWrap={true} shouldScale={false} />
        </div>
      </main>
    </div>
  );
};

export default MyList;
