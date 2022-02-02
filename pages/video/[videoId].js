import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

import cls from 'classnames';
import { getYoutubeVideoById } from '../../lib/videos';
import NavBar from '../../components/nav/navbar';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  // lord of the rings: T9o-bx1KMpQ
  const videoId = context.params.videoId;
  console.log({ context })

  const video = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: video.length > 0 ? video[0] : {}
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['eeZ1Ufdra0E', 'Me50VkUdP2I', 'vevYlHV9raY'];

  const paths = listOfVideos.map(videoId => ({
    params: {
      videoId
    }
  }));

  return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
  const router = useRouter();

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0}
  } = video;

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {/* <div>I am a modal</div> */}
        <iframe
          id='player'
          className={styles.videoPlayer}
          type='text/html'
          width='100%'
          height='390'
          src={`http://www.youtube.com/embed/${router.query.videoId}?autoplay=1&enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder='0'
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishedAt}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
