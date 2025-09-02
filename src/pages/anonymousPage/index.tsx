import { useEffect, useState } from "react";
import styles from "./anonymous.module.scss";
import GameCard from "../../components/organisms/gameCard";
import { getDeals, loginUser } from "../../services/services";
import Button from "../../components/atoms/button";
import { deleteUser } from "../../utils/deleteUser";

const AnonymousPage = () => {
  const [dealsList, setDealsList] = useState<DealsList[]>([]);

  useEffect(() => {
    getDeals().then((data) => {
      setDealsList(data);
    });
  }, []);

  return (
    <div className={styles.anonymousPage}>
      <div className={styles.dealsList}>
        {dealsList.map((i, index: number) => {
          return (
            <GameCard
              key={index}
              gameImage={i.image_url}
              gameTitle={i.game_name}
              normalPrice={i.normal_price}
              salePrice={i.sale_price}
              store={
                i.store.store_name?.toLowerCase() as "steam" | "humble" | "gog"
              }
            />
          );
        })}
      </div>
      <div className={styles.authContainer}>
        <p>Register or login to view all offer and filter it</p>
        <div className={styles.authButtons}>
          <a href="">
            <Button>Register</Button>
          </a>
          <a href="">
            <Button>Login</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnonymousPage;
