import { useState } from 'react';
import Image from 'next/image';
import cls from 'classnames';

import { motion } from 'framer-motion';

import styles from './card.module.css';

const Card = ({ imgUrl = '/static/movie-clip.jpeg', size = 'medium', id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem
  };

  const handleError = () => {
    console.log('error');
    setImgSrc('/static/movie-clip.jpeg');
  };

  const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1}

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt='image'
          layout='fill'
          onError={handleError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
