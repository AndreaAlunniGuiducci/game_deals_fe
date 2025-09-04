import { useEffect, useState } from "react";
import InputSelect from "../../components/atoms/inputSelect";
import { getDeals, getStore } from "../../services/services";
import styles from "./home.module.scss";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/loadingSlice";
import GameCard from "../../components/organisms/gameCard";

const Home = () => {
  const dispatch = useDispatch();
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [dealsList, setDealsList] = useState<DealsList[]>([]);
  const [filter, setFilter] = useState({ store: "", price: "", sorting: "" });

  const priceRange = [
    { label: "Any", value: "" },
    { label: "0$ - 20$", value: "0-20" },
    { label: "20$ - 50$", value: "20-50" },
    { label: "50$ - 80$", value: "50-80" },
    { label: "80$ +", value: "80" },
  ];

  const dealsSorting = [
    { label: "Default", value: "" },
    { label: "Deals range", value: "deal_rating" },
    { label: "Price", value: "sale_price" },
    { label: "Name", value: "game_name" },
  ];

  const retriveStore = async () => {
    dispatch(setLoading(true));
    const storeData = await getStore();
    dispatch(setLoading(false));
    setStoreList(storeData);
  };
  const retriveDeals = async () => {
    dispatch(setLoading(true));
    const data = await getDeals();
    dispatch(setLoading(false));
    setDealsList(data.results);
  };

  useEffect(() => {
    Promise.all([retriveStore(), retriveDeals()]);
  }, []);

  useEffect(() => {
    console.log(dealsList);
  }, [filter]);

  return (
    <div className={styles.home}>
      <div className={styles.filterWrapper}>
        <InputSelect
          onChange={(e) => {
            const storeID = e.target.value;
            setFilter({ ...filter, store: storeID });
          }}
          label="Store"
          options={[{ label: "Any", value: "" }].concat(
            storeList.map((store) => {
              return {
                label: store.store_name,
                value: String(store.store_id),
              };
            })
          )}
          value={filter.store}
        />
        <InputSelect
          onChange={(e) => {
            const price = e.target.value;
            setFilter({ ...filter, price });
          }}
          label="Price"
          options={priceRange}
          value={filter.price}
        />
        <InputSelect
          onChange={(e) => {
            const sorting = e.target.value;
            setFilter({ ...filter, sorting });
          }}
          label="Sort"
          options={dealsSorting}
          value={filter.sorting}
        />
      </div>
      <div className={styles.dealsList}>
        {dealsList.map((deal) => (
          <GameCard
            key={deal.external_id}
            gameImage={deal.image_url}
            gameTitle={deal.game_name}
            normalPrice={deal.normal_price}
            salePrice={deal.sale_price}
            store={deal.store.store_name as "steam"}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
