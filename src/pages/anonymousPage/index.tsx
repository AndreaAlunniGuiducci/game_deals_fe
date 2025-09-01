import { useEffect, useState } from "react";
import styles from "./anonymous.module.scss";
import GameCard from "../../components/organisms/gameCard";

const AnonymousPage = () => {
  const [dealsList, setDealsList] = useState<any[]>([1]);

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.anonymousPage}>
      <div className={styles.dealsList}>
        {dealsList.map((i: any, index: number) => {
          return (
            <GameCard
              key={index}
              gameImage={"/vite.svg"}
              gameTitle="Title"
              normalPrice="122"
              salePrice="50"
              store="steam"
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnonymousPage;
