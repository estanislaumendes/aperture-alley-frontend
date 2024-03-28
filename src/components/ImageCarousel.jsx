import { useState } from 'react';
import { motion } from 'framer-motion';
import fallbackImage from '../assets/fallback-camera.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ImageCarousel({ camera }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === camera.img.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? camera.img.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        borderRadius: '2.5%',
      }}
    >
      {camera.img.length > 0 ? (
        <motion.img
          key={camera._id[currentIndex]}
          src={camera.img[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <img
          src={fallbackImage}
          alt="Fallback Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {camera.img.length > 1 && (
        <>
          <button
            onClick={prevImage}
            style={{ position: 'absolute', top: '50%', left: '10px' }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="xl"
              style={{ color: '#e41f8c' }}
            />
          </button>
          <button
            onClick={nextImage}
            style={{ position: 'absolute', top: '50%', right: '10px' }}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              size="xl"
              style={{ color: '#e41f8c' }}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
