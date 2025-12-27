'use client';

import styles from './error.module.scss';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          We encountered an unexpected error. Please try again.
        </p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.button}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
