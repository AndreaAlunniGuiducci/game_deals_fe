import styles from "./gameCard.module.scss";

export type GameCardProps = {
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
  store,
}: GameCardProps) => {
  return (
    <div className={styles.gameCard}>
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
