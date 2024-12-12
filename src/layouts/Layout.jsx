import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p>Developed by Amirali with ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
