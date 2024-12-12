import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  function previousHandler() {
    if (page > 1) {
      setPage(page => page - 1);
    }
  }

  function nextHandler() {
    if (page < 13) {
      setPage(page => page + 1);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : undefined}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : undefined}>1</p>
      <p className={page === 2 ? styles.selected : undefined}>2</p>
      {page > 2 && page < 12 ? (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
          <span>...</span>
        </>
      ) : (
        <span>...</span>
      )}
      <p className={page === 12 ? styles.selected : undefined}>12</p>
      <p className={page === 13 ? styles.selected : undefined}>13</p>
      <button
        onClick={nextHandler}
        className={page === 13 ? styles.disabled : undefined}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
