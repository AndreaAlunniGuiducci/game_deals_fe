import { useEffect, useState } from "react";
import InputSelect from "../../components/atoms/inputSelect";
import { getDeals, getStore } from "../../services/services";
import styles from "./home.module.scss";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/loadingSlice";
import GameCard from "../../components/organisms/gameCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routePath } from "../../utils/routePath";
import Button from "../../components/atoms/button";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [dealsList, setDealsList] = useState<DealsList[]>([]);
  const [filter, setFilter] = useState({ store: "", price: "", sorting: "" });
  const [offset, setOffset] = useState<string | null>(null);

  const priceRange = [
    { label: "Any", value: "" },
    { label: "0$ - 20$", value: "0-20" },
    { label: "20$ - 50$", value: "20-50" },
    { label: "50$ - 80$", value: "50-80" },
    { label: "80$ +", value: "80" },
  ];

  const dealsSorting = [
    { label: "Default", value: "" },
    { label: "Deals rating", value: "deal_rating" },
    { label: "Price", value: "sale_price" },
    { label: "Name", value: "game_name" },
    { label: "Saving", value: "saving" },
  ];

  const retriveStore = async () => {
    dispatch(setLoading(true));
    const storeData = await getStore();
    dispatch(setLoading(false));
    setStoreList(storeData);
  };

  const retriveDeals = async (
    params?: Record<string, string>,
    offset?: string | null
  ) => {
    dispatch(setLoading(true));
    const data = await getDeals(params, offset);
    dispatch(setLoading(false));
    if (data?.next) {
      const [_, paramsString] = data.next.split("?");
      const params = new URLSearchParams(paramsString);
      const offsetParam = params.get("offset");
      setOffset(offsetParam);
    } else {
      setOffset(null);
    }
    if (data?.results) {
      if (offset) {
        setDealsList([...dealsList, ...data.results]);
      } else {
        setDealsList(data.results);
      }
    } else {
      setDealsList([]);
    }
  };

  const getParams = (): Record<string, string> => {
    const newParams: Record<string, string> = {};
    if (filter.store) newParams["store"] = filter.store;
    if (filter.price) newParams["price"] = filter.price;
    if (filter.sorting) newParams["sorting"] = filter.sorting;
    return newParams;
  };

  useEffect(() => {
    console.log("OFFSET", offset);
  }, [offset]);

  useEffect(() => {
    Promise.all([retriveStore(), retriveDeals()]);
  }, []);

  useEffect(() => {
    const newParams = getParams();
    setSearchParams(newParams);
    retriveDeals(newParams);
  }, [filter]);

  useEffect(() => {
    const store = searchParams.get("store") || "";
    const price = searchParams.get("price") || "";
    const sorting = searchParams.get("sorting") || "";
    setFilter({ store, price, sorting });
  }, [searchParams]);

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
                value: String(store.store_name),
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
      <div className={styles.ctaContainer}>
        <Button
          onClick={() => {
            const newParams = getParams();
            retriveDeals(newParams, offset);
          }}
          disabled={!offset}
        >
          {offset ? "Show more" : "No more game to show"}
        </Button>
      </div>
    </div>
  );
};

export default Home;
