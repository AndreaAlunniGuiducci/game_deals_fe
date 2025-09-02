import { useEffect } from "react";
import styles from "./home.module.scss";
import { getDeals } from "../../services/services";

const Home = () => {
  useEffect(() => {
    getDeals();
  }, []);

  return <div className={styles.home}></div>;
};

export default Home;
