import { Hero as HeroType } from '@/content/types/hero';
import styles from './Hero.module.scss';

interface HeroProps {
  content: HeroType;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{content.title}</h1>
        {content.subtitle && (
          <p className={styles.subtitle}>{content.subtitle}</p>
        )}
        {content.cta && (
          <a href={content.cta.href} className={styles.cta}>
            {content.cta.text}
          </a>
        )}
      </div>
    </section>
  );
}
