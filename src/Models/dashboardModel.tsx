export const dasboardModel = [
    {id:1,route:'/home/restraunts',name:'Best Dish', img:'/assets/images/icons/dashboard/best_dish.jpg'},
    {id:2,route:'/home/top10',name:'Top 10', img:'/assets/images/icons/dashboard/top10.jpg'},
    {id:3,route:'/',name:'Tiffin Box', img:'/assets/images/icons/dashboard/tiffin.jpg'},
    {id:4,route:'/home/book_table',name:'Table Booking', img:'/assets/images/icons/dashboard/table_book.jpg'},
    {id:5,route:'/',name:'Resto Chat', img:'/assets/images/icons/dashboard/chat1.jpg'},
    {id:6,route:'/',name:'Order Online', img:'/assets/images/icons/dashboard/deliver.jpg'},
    {id:7,route:'/',name:'Dairy', img:'/assets/images/icons/dashboard/diary.jpg'},
    {id:8,route:'/',name:'Wallets', img:'/assets/images/icons/dashboard/wallet.jpg'},
    {id:9,route:'/',name:'FeedBack', img:'/assets/images/icons/dashboard/feedback.jpg'},
    {id:10,route:'/',name:'Friends', img:'/assets/images/icons/dashboard/friends.jpg'},
    {id:11,route:'/',name:'Food Marshal', img:'/assets/images/icons/dashboard/food_marshal.jpg'},
    {id:12,route:'/',name:'Events', img:'/assets/images/icons/dashboard/events.jpg'},
    {id:13,route:'/',name:'Map It', img:'/assets/images/icons/dashboard/map.jpg'},
    {id:14,route:'/',name:'Search', img:'/assets/images/icons/dashboard/search.jpg'},
    {id:15,route:'/',name:'Change City', img:'/assets/images/icons/dashboard/change_city.jpg'},
    {id:16,route:'/',name:'Pledge', img:'/assets/images/icons/dashboard/pledge.jpg'},
    {id:17,route:'/',name:'Share', img:'/assets/images/icons/dashboard/share.jpg'},
    {id:15,route:'/',name:'My Profile', img:'/assets/images/icons/dashboard/user.jpg'},
    {id:16,route:'/',name:'Contact Us', img:'/assets/images/icons/dashboard/contact_us.jpg'},
    {id:17,route:'/merchants',name:'Merchant Login', img:'/assets/images/icons/dashboard/merchant.jpg'},
    
]
export interface User {
    Uniqueid: string;
    Discription: string;
    ImageName: string;
    Order: number;
}

export interface Owner {
    Uniqueid: string;
    Discription: string;
    ImageName: string;
    Order: number;
}

export interface IDishCoMenuList {
    BackgoundColor: string;
    BackgoundColorAlpha: string;
    BackgoundImage: string;
    User: User[];
    Owner: Owner[];
    PartnerRestaurants: string;
}
//-------------------------------------
export interface IAllCities {
    CityId: number;
    CityName: string;
}
export interface ICityId {
    CityId: number;
    CityName: string;
    CountryId: number;
    CountryName: string;
}
//---------------------------------------

export interface CreditCard {
    CreditCard: string;
}

export interface Cuisine {
    Cuisine: string;
    CuisineId: number;
}

export interface Facility {
    FacilityId: number;
    Facility: string;
    FacilityText: string;
}

export interface Beverage {
    LiquorId: number;
    LiquorName: string;
}

export interface MealType {
    MealId: number;
    MealDescription: string;
}

export interface Type {
    RestaurantType: string;
    RestaurantTypeId: number;
}

export interface ICuisinesAndCreditCardTypes {
    CreditCards: CreditCard[];
    Cuisines: Cuisine[];
    Facilities: Facility[];
    Beverage: Beverage[];
    MealType: MealType[];
    Types: Type[];
}
//----------------------------------------------
export interface ICustomerCheckFlag {
    IsApprover: number;
    MessageCode: number;
    Message: string;
    NewsTrack: number;
    IsOonlineDelivery: number;
}
export interface IAllCountries {
    CountryId: number;
    CountryName: string;
    CountryDialCode: string;
}
export interface IFormatedAddress {
    FullAddress: string;
    CityId: number;
    CityName: string;
    CountryName: string;
    CountryId: number;
    Message?: any;
}
export interface IAccountListByCustId {
    StatusCode: number;
    StatusDescription: string;
    AccountList?: any;
}
