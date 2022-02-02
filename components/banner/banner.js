import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './banner.module.css';

const Banner = ({ title, subTitle, imgUrl, videoId }) => {
  const router = useRouter();

  const handleOnPlay = () => {
    router.push(`video/${videoId}`)
    console.log('Play');
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subTitle}>{subTitle}</p>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src='/static/play_arrow.svg'
                alt='play icon'
                width='32px'
                height='32px'
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
