import { useNavigate } from "react-router-dom";
import styles from "./gameCard.module.scss";
import { routePath } from "../../../utils/routePath";

export type GameCardProps = {
  dealId: string;
  store: { img: string; name: string };
  gameTitle: string;
  gameImage: string;
  salePrice: number;
  normalPrice: number;
};

const GameCard = ({
  gameImage,
  gameTitle,
  normalPrice,
  salePrice,
  store,dealId
}: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.gameCard}
      onClick={() => {
        const path = routePath.deal_detail.replace(":dealId", dealId)
        navigate(path)
      }}
    >
      <div className={styles.cardHeader}>
        <img
          className={styles.gameImage}
          src={gameImage}
          alt={`${gameTitle}`}
        />
      </div>
      <div className={styles.saleDetail}>
        <div className={styles.gameTitle}>{gameTitle}</div>
        <div className={styles.salePrice}>
          <p>{salePrice <= 0 ? "Free" : salePrice + "$"} on</p>
          <img src={store.img} alt={store.name} />
        </div>
        <div className={styles.normalPrice}>Instead of {normalPrice}$</div>
      </div>
    </div>
  );
};

export default GameCard;
