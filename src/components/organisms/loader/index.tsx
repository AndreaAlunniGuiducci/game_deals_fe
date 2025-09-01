import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderLayer}>
      <div className={styles.loader}>Loading... <div className={styles.spinner}></div></div>
    </div>
  );
};

export default Loader;
