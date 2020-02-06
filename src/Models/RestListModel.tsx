export interface IAllRestaurantDish {
  
  RestaurantId: number;
  RestaurantName: string;
  RestaurantDishId: number;
  RestaurantDishName: string;
  LocationName: string;
  RestaurantCity: string;
  Distance: number;
  Votes: number;
  DishRank: number;
  Latitude: string;
  Longitude: string;
  DishImage: string;
  PromoFlag: number;
  FmUsers: number;
  NoOfCoupons: number;
  TotalPledge: number;
  DishType: number;
  Friends: number;
  DishSequence: number;
  Cuisines: string;
  AccountId: number;
  ChainOfRest: number;
}

export interface ImageAdvertisement {
  Id: number;
  RestaurantId: number;
  ImageName: string;
  TimePeriod: number;
  RankOrder: number;
  Message?: any;
  AccountId: number;
  ChainOfRest: number;
  LastFlag: number;
}

export interface SuggestedImage {
  SerialNumber: number;
  ImageSize: number;
  SuggestionImage: string;
  LinkedPage: string;
  ParaMeters: string;
  Message?: any;
  PageAction: string;
  RestaurantId: number;
  AccountId: number;
  Flag: number;
  SuggestionId: number;
  SearchType: number;
}

export interface NotificationCount {
  NotificationCount: number;
  CountOfCoupons: number;
  CountOfChat: number;
  CountOfBookings: number;
  CountOfFriends: number;
}

export interface NoOfRestaurants {
  NoOfRestaurants: number;
}

export interface IRestList {
  AllRestaurantDishes: IAllRestaurantDish[];
  ImageAdvertisement: ImageAdvertisement[];
  SuggestedImages: SuggestedImage[];
  PopUpImages: any[];
  NotificationCount: NotificationCount;
  Message?: any;
  NoOfRestaurants: NoOfRestaurants;
}
