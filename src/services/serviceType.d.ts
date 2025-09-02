interface Store {
  storeID: number;
  store_name: string;
  store_logo_url: string;
  store_banner_url: string;
  store_icon_url: string;
}

declare interface DealsList {
  store: Store;
  external_id: string;
  game_name: string;
  image_url: string;
  sale_price: number;
  normal_price: number;
  deal_rating: number;
}
