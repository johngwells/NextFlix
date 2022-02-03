import Link from 'next/link';
import styles from './section-cards.module.css';

import Card from './card';

const SectionCards = props => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return (
            <Link key={idx} href={`/video/${video.id}`}>
              <a>
                <Card id={idx} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
