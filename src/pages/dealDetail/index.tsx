import { useNavigate, useParams } from "react-router-dom";
import styles from "./dealDetail.module.scss";
import Button from "../../components/atoms/button";
import { routePath } from "../../utils/routePath";
import { useEffect, useState } from "react";
import { getDeals } from "../../services/services";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/loadingSlice";

const DealDetail = () => {
  const dispatch = useDispatch();
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [dealDetail, setDealDetail] = useState<DealsList>();

  const retrieveDealDetail = async () => {
    if (dealId) {
      dispatch(setLoading(true));
      if (!!dealId) {
        const data = await getDeals({ external_id: dealId });
        dispatch(setLoading(false));
        if (data?.results) {
          setDealDetail(data?.results[0]);
        }
      }
    }
  };
  useEffect(() => {
    retrieveDealDetail();
  }, [dealId]);

  return (
    <div className={styles.dealDetail}>
      <div className={styles.hero}>
        <img src={dealDetail?.image_url} alt={dealDetail?.game_name} />
      </div>
      <div className={styles.dealDetailContainer}>
        <h3 className={styles.gameName}>{dealDetail?.game_name}</h3>
        <p className={styles.storeName}>on {dealDetail?.store.store_name}</p>
        <ul>
          <li>
            <span>
              Price: {dealDetail?.sale_price}${" "}
              <p>insted of {dealDetail?.normal_price}$</p>
            </span>
          </li>
          <li>Deal rating: {dealDetail?.deal_rating}</li>
          <li>Game Rating: {dealDetail?.rating_text}</li>
          <li>
            Released:
            {new Date(dealDetail?.release_date ?? 0).toLocaleDateString("en", {
              month: "long",
              year: "numeric",
            })}
          </li>
        </ul>
      </div>
      <div className={styles.ctaContainer}>
        <Button onClick={() => navigate(routePath.home)}>Back to list</Button>
        <Button>Go to store page</Button>
      </div>
    </div>
  );
};

export default DealDetail;
