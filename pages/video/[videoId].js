import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

import cls from 'classnames';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();

  const video = {
    title: 'Apex',
    publishTime: '2022-01-01',
    description: 'this is the description',
    channelId: 'Apex gaming',
    viewCount: 10000
  };

  const { title, publishTime, description, channelId, viewCount } = video;

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
