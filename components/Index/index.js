import styles from '../../styles/Pages.module.css';
import Settings from '../Settings';

export default function Index({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="icons/icon64.png" className={styles.icon} />
          Github — Unhappy Approve
        </h1>
        <div className={styles.settingsdescription} >Default comment in Github when you unhappy about pull request</div>
        <Settings />
      </main>
    </div>
  );
}
