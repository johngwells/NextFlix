import { useState } from 'react';
import Image from 'next/image';
import cls from 'classnames';

import { motion } from 'framer-motion';

import styles from './card.module.css';

const Card = ({ imgUrl = '/static/movie-clip.jpeg', size = 'medium' }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem
  };

  const handleError = () => {
    console.log('error');
    setImgSrc('/static/Lordoftherings.jpeg');
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ scale: 1.2 }}
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
