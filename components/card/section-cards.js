import Link from 'next/link';
import styles from './section-cards.module.css';
import cls from 'classnames';

import Card from './card';

const SectionCards = props => {
  const { title, videos = [], size, shouldWrap = false, shouldScale} = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link key={idx} href={`/video/${video.id}`}>
              <a>
                <Card id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
