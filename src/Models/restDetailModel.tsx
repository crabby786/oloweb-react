
export const menuItem = [
    { name: "For You", icon: "restaurant_menu" },
    { name: "Menu", icon: "chrome_reader_mode" },
    { name: "Bookings", icon: "restaurant" },
    { name: "Call", icon: "phone_in_talk" },
    { name: "Resto Chat", icon: "chat" },
    { name: "Facilities", icon: "assignment" },
    { name: "Share", icon: "share" },
    { name: "Hail Cab", icon: "directions_car" },
    { name: "Order Online", icon: "motorcycle" },
    { name: "Feedback", icon: "contact_support" }
  ];
  export const tabData = [
    { name: "Location", data: {}, comp: () => <h1>tab 1 content</h1> },
    { name: " Cuisines", data: {}, comp: () => <h1>tab 2 content</h1> },
    { name: "Payment", data: {}, comp: () => <h1>tab 3 content</h1> }
  ];

    export interface CrediteCard {
        CrediteCardsImage: string;
    }

    export interface Cuisine {
        Cuisine: string;
        CuisineId: number;
    }

    export interface RestaurantDish {
        RestaurantDishId: number;
        RestaurantDishName: string;
        Rank: number;
        Votes: string;
        IsVeg: number;
        DishImage: string;
        DishGlossary: number;
        FMUser: number;
        Friends: number;
        IsDishLike: number;
        DishSequence: number;
        Rate: string;
    }

    export interface Facility {
        Facilities: string;
        Values: boolean;
    }

    export interface TouristDetail {
        RestaurantDishId: number;
        TouristRank: number;
        TouristVotes: string;
        TouristFMUser: number;
        TouristFriends: number;
    }

    export interface CheckInStatus {
        StatusFlag: number;
    }

    export interface RestaurantDetailMenuUser {
        Uniqueid: string;
        Discription: string;
        ImageName: string;
        Order: number;
    }

    export interface RestaurantDetailMenuOwner {
        Uniqueid: string;
        Discription: string;
        ImageName: string;
        Order: number;
    }

    export interface IRestDetail {
        RestaurantID: number;
        RestaurantName: string;
        RestaurantAddress: string;
        Location: string;
        ContactNumber: string;
        Votes: string;
        Rating: number;
        OpeningsHours: string;
        RestaurantLogo: string;
        AvgMealRate: number;
        BOTRestaurantId: number;
        Distance: number;
        Latitude: string;
        Longitude: string;
        TotalPledge: number;
        PromoDetails: string;
        PromoURL: string;
        PromoImage: string;
        RestaurantFlag: number;
        ShareFlag: number;
        FeedbackFacility: number;
        HomeDelivery: number;
        IsClubAccount: number;
        HappyHoursFromTime: string;
        HappyHoursToTime: string;
        MenuImages: any[];
        CrediteCards: CrediteCard[];
        Cuisines: Cuisine[];
        RestaurantDishes: RestaurantDish[];
        CustomersPromos: any[];
        Facilities: Facility[];
        TouristDetails: TouristDetail[];
        CheckInStatus: CheckInStatus;
        CityId: number;
        CityName: string;
        MinOrder: string;
        MinTime: string;
        AccountId: number;
        DeliveryFromTime: string;
        DeliveryToTime: string;
        GroupId: string;
        RestaurantDetailMenuUser: RestaurantDetailMenuUser[];
        RestaurantDetailMenuOwner: RestaurantDetailMenuOwner[];
        RestaurantImage: string;
        WeekTime: any[];
    }

    //------------------------------------OLO models ------------------------

    export interface Modifier {
        ModifierGroupCode: number;
        ModifierGroupName: string;
        ModifierCode: number;
        ModifierName: string;
        TouchScreenDescription: string;
        Chargeable: string;
        AllowChange: boolean;
        Price: number;
        MenuItemCode?: string;
    }
    export interface MenuItemList {
        PropPubMenuHeadCode?: string;
        PropMenuItemCode?: string;
        PropPubMenuItemDescription?: string;
        PropPubMenuItemlineDescription?: string;
        PropPubIncomeHeadCode?: string;
        PropPubImagePath?: string;
        PropPubVegNonVeg?: string;
        PropPubRate?: number;
        PropPubQuantityDeciaml?: string;
        Status?: any;
        Modifier?: Modifier[];
        Qty?: number;
        cartQty?: number;
    }
    

    export interface IMenuHeadListWithItems {
        PropPubMenuHeadCode?: string;
        MenuHead?: MenuHeadList;
        MenuItemList?: MenuItemList[];
    }
    export interface AddonList {
        ProPubIntMenuComboModifier: string;
        ProPubStrItemDescription: string;
        ProPubBoolIsAllowChange: boolean;
        ProPubStrModifierQtyCode: string;
        ProPubStrPreModifierCode: string;
        ProPubIntQty: number;
        ProPubStrModifierCode: string;
        ProPubSessionId: string;
        ProPubIntSelectedRowIndex: number;
    }
    export interface IPropMenuItemDetails {
        ProPubStrMenuItemCode: string;
        ProPubIntQty: number;
        ProPubIntMenuComboModifier: string;
        ProPubStrCurrentIncomeHeadCode: string;
        ProPubIntSelectedRowIndex: number;
        ProPubSessionId: string;
        ProPubStrPreModifierCode: string;
        ProPubStrItemDescription: string;
        ProPubBoolIsAllowChange?: boolean;
        ProPubStrModifierQtyCode: string;
        ProPubStrModifierCode: string;
    }
    export interface ImyCart {
        ProPubStrMenuItemCode: string;
        ProPubIntQty: number;
        ProPubStrCurrentIncomeHeadCode: string;
        ProPubStrPreModifierCode: string;
        ProPubIntMenuComboModifier: number;
        ProPubIntSelectedRowIndex?: number;
        ProPubSessionId?: string;
        PropPubRate: number;
        PropPubPrice?: number;
        MenuItem: MenuItemList;
        addonList?: AddonList[];
        addonPrice?: number;
        addonRate?: number;
    }

//new meals
export interface MenuHeadList {
    PropPubModifierLinked: string;
    PropPubMenuHeadCode: string;
    PropPubPopularMenuHeadCode?: any;
    PropPubMenuHeadDescription: string;
    PropPubTaxType: string;
    PropDeciamlAllowed: string;
    Status: string;
}
export interface MenuItemModifierList {
    Modifier: Modifier[];
    PreModifier?: any;
    Status?: any;
}

export interface IMenuDetailsSingleApi {
    MenuHeadList: MenuHeadList[];
    MenuItemList: MenuItemList[];
    MenuItemModifierList?: MenuItemModifierList;
}
    
//checkout
export interface PropPubOrderCharge {
    PropPubMenuHeadCode: string;
    PropMenuItemCode: string;
    PropPubMenuItemDescription: string;
    PropPubMenuItemlineDescription: string;
    PropPubIncomeHeadCode: string;
    PropPubImagePath?: any;
    PropPubVegNonVeg: string;
    PropPubRate: number;
    PropPubQuantityDeciaml: string;
    Status?: any;
    ItemType: string;
}

export interface CheckTotalAmount {
    PropTotalDiscount: number;
    PropDeliveryChanges: number;
    PropMessageCode: string;
    PropPubMessage: string;
    PropTotalAmount: number;
    PropTotalTax: number;
    Status?: any;
    PropGrandTotalAmount: number;
    PropPubOrderCharges: PropPubOrderCharge[];
}

