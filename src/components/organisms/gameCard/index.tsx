import styles from "./gameCard.module.scss";

export type GameCardProps = {
  store: "steam" | "humble" | "gog";
  gameTitle: string;
  gameImage: string;
  salePrice: string;
  normalPrice: string;
};

const GameCard = ({
  gameImage,
  gameTitle,
  normalPrice,
  salePrice,
  store,
}: GameCardProps) => {
  return (
    <div className={`${styles.gameCard} ${styles[store]}`}>
      <div className={styles.cardHeader}>
        <img
          className={styles.gameImage}
          src={gameImage}
          alt={`${gameTitle}`}
        />
      </div>
      <div className={styles.saleDetail}>
        <div className={styles.gameTitle}>{gameTitle}</div>
        <div className={styles.salePrice}>{salePrice}</div>
        <div className={styles.normalPrice}>{normalPrice}</div>
      </div>
    </div>
  );
};

export default GameCard;
