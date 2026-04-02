'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logoHero from '@/app/favicon.ico';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let loadProgress = 0;
    const interval = setInterval(() => {
      loadProgress += Math.random() * 10 + 2;
      if (loadProgress >= 100) loadProgress = 100;
      setProgress(loadProgress);
      if (loadProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 1000);
        }, 400);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={`preloader${done ? ' done' : ''}`} id="preloader">
      <div className="preloader-inner">
        <div className="preloader-logo">
          <Image
            src={logoHero}
            width={48}
            height={48}
            alt="Anjanex logo"
            priority
          />
        </div>
        <div className="preloader-bar">
          <motion.div
            className="preloader-bar-fill"
            id="preloaderFill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>
        <span className="preloader-count" id="preloaderCount">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
