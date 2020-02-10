export interface IAccountList {
    AccountId: number;
    AccountName: string;
    Logo: string;
    CityName: string;
    LocationName: string;
}

export interface IMerchantList {
    StatusCode: number;
    StatusDescription: string;
    AccountList: IAccountList[];
}

export interface ISubAccount {
    RestaurantName: string;
    RestaurantId: number;
    Location: string;
    City: string;
    ServicesRightsId: string;
    ServicesRights: string;
    RestaurantLogo: string;
    ClubId: number;
    ClubName: string;
    ForeColour: string;
    BackGroundColour: string;
    Cuisines: string;
    OrderForOwner: string;
    FeedbackSubscription: number;
    IsAppLogo: number;
    ScrollFlag: number;
    IsToggle: number;
    OpeningHours: string;
    AccountId: number;
    GroupId: string;
    ClientId: string;
    SqlmApiUrl: string;
    IsAccountwiseSale: boolean;
    IsPacketUpdated: boolean;
    IsAnalytics: boolean;
    IsEnableBOT: boolean;
    BOTSSLinkup: boolean;
}

