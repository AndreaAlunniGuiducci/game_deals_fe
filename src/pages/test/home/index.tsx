import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { getJwt } from "../../../utils/getJwt";

const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const token = getJwt();
    setJwt(token);
  }, []);

  return <div className={styles.home}>
    
  </div>;
};

export default Home;
