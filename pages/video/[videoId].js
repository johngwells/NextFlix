import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

import cls from 'classnames';
import { getYoutubeVideoById } from '../../lib/videos';

Modal.setAppElement('#__next');

export async function getStaticProps() {
  // const video = {
  //   title: 'Apex',
  //   publishTime: '2022-01-01',
  //   description: 'this is the description',
  //   channelId: 'Apex gaming',
  //   viewCount: 10000
  // };

  const videoId = 'eeZ1Ufdra0E';

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
    publishTime,
    description,
    channelId,
    statistics
  } = video;

  return (
    <div className={styles.container}>
      {/* Video page {router.query.videoId} */}
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
          frameborder='0'
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelId}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{0}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
