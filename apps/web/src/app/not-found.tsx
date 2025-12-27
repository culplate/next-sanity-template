import styles from './not-found.module.scss';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className={styles.link}>
          Return to home
        </Link>
      </div>
    </div>
  );
}
