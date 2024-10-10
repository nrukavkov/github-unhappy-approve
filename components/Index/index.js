import styles from '../../styles/Pages.module.css';
import Settings from '../Settings';

export default function Index({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Github — Unhappy Approve</h1>
        <Settings ></Settings>
      </main>
    </div>
  );
}
