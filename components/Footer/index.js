import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/2FrogsStudio/github-unhappy-approve-chrome-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <img
            src="icons/icon48-github.png"
            alt="Logo"
            width={16}
            height={16}
          />
        </span>
        GitHub
      </a>
      {/* <a
        href="https://chromewebstore.google.com/detail/github-unhappy-approve/phangnjfpipgeomgnakfhjeepnnadbob"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <img
            src="icons/icon64-chromewebstore.png"
            alt="Logo"
            width={16}
            height={16}
          />
        </span>
        Feedback
      </a> */}
    </footer>
  );
}
