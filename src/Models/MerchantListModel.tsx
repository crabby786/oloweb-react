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
