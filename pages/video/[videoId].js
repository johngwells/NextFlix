import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

import cls from 'classnames';
import { getYoutubeVideoById } from '../../lib/videos';
import NavBar from '../../components/nav/navbar';

import Like from '../../components/icons/like-icon';
import Dislike from '../../components/icons/dislike-icon';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const videoId = context.params.videoId;

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
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const router = useRouter();
  const videoId = router.query.videoId;
  console.log({ videoId })

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 }
  } = video;

  // [empty] sets only once on componentDidMount
  useEffect(async () => {
    const response = await fetch(`/api/stats?videoId=${videoId}`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log({data})

    if (data.length > 0) {
      const favorited = data[0].favorited;
      if (favorited === 1) {
        setLike(true);
      } else if (favorited === 0) {
        setDislike(true);
      }
    }
  }, []);

  const submitFavorited = async favorited => {
    return await fetch('/api/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId,
        favorited
      })
    });
  };

  const handleToggleLike = async () => {
    console.log('like');
    const val = !like;
    setLike(val);
    setDislike(like);

    const response = await submitFavorited(val ? 1 : 0);
  };

  const handleToggleDislike = async () => {
    console.log('dislike');
    const val = !dislike;
    setDislike(!dislike);
    setLike(dislike);

    const response = await submitFavorited(val ? 0 : 1);
  };

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
          src={`http://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder='0'
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={like} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={dislike} />
            </div>
          </button>
        </div>

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
