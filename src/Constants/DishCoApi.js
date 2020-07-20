
export const androidHeader = { "AndroidPhone": 'EV6FTlgBhOalM+qjJpr2OZpAEpPkYJHC5I1aOWyeLevwSIpuzyKEAg==' };
export const imgBase = `https://foodmarshal.blob.core.windows.net/fmtesting/`;
// export const imgBase = `https://foodmarshal.blob.core.windows.net/fmstorage/`;

// export const BaseApi = "https://fmprod.dishco.com/shawmanservices/api/";
export const BaseApi = "https://fmtest.dishco.com/shawmanservices/api/";

export const RestListApi = "RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter";

export const RestDetailApi = "SingleRestaurantDetails/GetFunPubGetSingleRestaurantDetails";
export const MerchantApi = "AccountDetailsByCustId/FunGetAccountListByCustId";
// extract query from string

export function extractQuery(str) {
  try {
    var strList = str.split("?");
    if (strList === undefined) throw new Error('can not find ? symbol in string!');
  var url = strList[0];
  var queryStr = strList[1];
  var objStrList = queryStr.split('&');
  var queryParams = {};
  objStrList.forEach((obj, i) => {
    let dividerIndex = obj.indexOf("=");
    let key = obj.substr(0, dividerIndex);
    let val = obj.substr(dividerIndex + 1);
    val = val.replace('+',' ') ;
    queryParams[key] = val;
  })
  } catch (error) {
    console.log(error);    
  }
  // console.log(queryParams);
  
  return {
    url, queryParams
  }
  
}

//app launch
export const appLaunchParams = {
  IntLocFlag:1,
  IntLocCustomerId:21257,
  Strloclattitute:'19.032204151153564',
  Strloclongitude:'73.01880598068237',
  intLocCountryId:1,
  StrLocCityName:'Navi Mumbai',
  StrLocLoction:'',
  IntLocCityId:3
}
export const DishCoMenuList_Api = 'DishCoMenuList/FunPubGetDishCoMenu'   
export const RestaurantLogin_Api = 'RestaurantLogin/FunPubGetRestaurantLoginDetails' 
export const AccountDetailsByCustId_Api = 'AccountDetailsByCustId/FunGetAccountListByCustId' 
export const GetFormatedAddress_Api = 'GetFormatedAddress/FunPubRetrieveFormatedAddress' 
export const GetAllCountries_Api = 'AllCountries/GetFuncPubAllCountries' 
export const GetAllCities_Api = 'AllCities/GetFuncPubAllCities' 
export const CityId_Api = 'GetCityId/GetFunPubCityId' 
export const GetCuisinesAndCreditCardTypes_Api = 'CuisinesAndCreditCardTypes/GetFunPubCuisinesAndCreditCardTypes' 
export const CheckPledgeFlag_Api = 'CheckPledgeFlag/FunPubCheckPledgeFlag' 
export const GetNoOfRestaurant_Api = 'NoOfRestaurant/GetFunPubNoOfRestaurant' 
export const GetCustomerCheckFlag_Api = 'CheckCustomerFlag/GetFunPubCustomerCheckFlag' 
export const HDCheckOnlineOrderFacility_Api = 'HDCheckOnlineOrderFacility/FunPubCheckOnlineOrderFacility' 
export const GetFunPubNoOfRestaurant_Api = 'NoOfRestaurant/GetFunPubNoOfRestaurant' 
//app launch End
export const GetRestaurantLoginDetails_Api = 'RestaurantLogin/FunPubGetRestaurantLoginDetails';
//List api and Sort
export const sortByLocal_Distance_Api = 'RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter'
export const sortByLocal_Distance_q = '?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=21257&StrLocDishName=&StrLocLatitude=19.032204151153564&StrLocLongitude=73.01880598068237&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=2&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

export const sortByLocal_Rank_Api = 'RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter'
export const sortByLocal_Rank_q = '?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=21257&StrLocDishName=&StrLocLatitude=19.032204151153564&StrLocLongitude=73.01880598068237&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=1&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

export const sortByTourist_Rank_Api = 'AllTouristDishesRankWiseFilter/GetFunPubAllTouristDishesRankWiseFilter'
export const sortByTourist_Rank_q = '?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=21257&StrLocDishName=&StrLocLatitude=19.032204151153564&StrLocLongitude=73.01880598068237&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=1&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

export const sortByTourist_Distance_Api = 'AllTouristDishesRankWiseFilter/GetFunPubAllTouristDishesRankWiseFilter'
export const sortByTourist_Distance_q = '?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=21257&StrLocDishName=&StrLocLatitude=19.032204151153564&StrLocLongitude=73.01880598068237&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=2&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

const Search_Api = {
  url: 'https://fmtest.dishco.com/shawmanservices/api/SearchRestaurant/FunPubSearch',
  query: 'StrLocSearchType=2&IntLocMaxAvgMealRate=0&StrLocLocation=&StrLocCreditCards=&IntLocCustomerId=116726&StrLocLatitude=19.1105766&IntLocPaging=30&StrLocCountry=&IntLocSkipPage=0&StrLocLongitude=73.0174678&IntLocDistance=0&DblLocTime=0.0&StrLocCuisines=&IntLocOrderBy=1&StrLocSearchTerm=taj&IntLocSigFlag=0&StrLocCity=Navi+Mumbai&StrLocFacilities=&IntLocMinAvgMealRate=0'
};

const FilterRests_Api = {
  url: 'https://fmtest.dishco.com/shawmanservices/api/SearchRestaurant/FunPubSearch',
  query: 'StrLocSearchType=2&IntLocMaxAvgMealRate=8000&StrLocLocation=&StrLocCreditCards=&IntLocCustomerId=116726&StrLocLatitude=19.1105766&IntLocPaging=30&StrLocCountry=&IntLocSkipPage=0&StrLocLongitude=73.0174678&IntLocDistance=0&DblLocTime=0.0&StrLocCuisines=Finger+Foods%2CSikkimese+Indian%2CBurmese&IntLocOrderBy=1&StrLocSearchTerm=taj&IntLocSigFlag=0&StrLocCity=Navi+Mumbai&StrLocFacilities=&IntLocMinAvgMealRate=0'
};

//sorting 

export const RestaurantDetailsByFilter_Api = 'https://fmtest.dishco.com/shawmanservices/api/RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=116726&StrLocDishName=&StrLocLatitude=19.1105766&StrLocLongitude=73.0174678&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=1&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

export const TouristDishesRankWiseFilter_Api = 'https://fmtest.dishco.com/shawmanservices/api/AllTouristDishesRankWiseFilter/GetFunPubAllTouristDishesRankWiseFilter?StrLocLocationName1=&IntLocAvgMealRate=0&IntLocCustomerId=116726&StrLocDishName=&StrLocLatitude=19.1105766&StrLocLongitude=73.0174678&StrLocCreditCardType=&StrLocLocationName=&StrLocCountryName=&StrLocCuisines=&StrLocCityName=Navi+Mumbai&StrLocIsFacilitieIds=&IntLocLastAdevrtisementId=0&IntLocOrderby=1&DecimalLocTime=&StrLocRestaurantName=&IntLocNoOfRecords=0'

const localDishImg = `/assets/images/other/dish1.jpg`
export const cuisineList = [
  'Biryani',
  'Juices',
  'Kerla Indian',
  'Mexican',
];





