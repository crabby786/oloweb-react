import { RestListApi, BaseApi, RestDetailApi } from '../../Constants/DishCoApi'
import { androidHeader } from '../../Constants/DishCoApi'

export function restListAction() {
    const options = {
        headers: {...androidHeader}
      };
      let query = `?StrLocDishName=&StrLocIsFacilitieIds=&StrLocCountryName=&StrLocCuisines=&StrLocRestaurantName=&IntLocCustomerId=21257&StrLocCityName=Navi+Mumbai&IntLocLastAdevrtisementId=0&StrLocLocationName1=&DecimalLocTime=&IntLocNoOfRecords=0&StrLocCreditCardType=&IntLocAvgMealRate=0&IntLocOrderby=2&StrLocLocationName=&StrLocLatitude=19.1110512&StrLocLongitude=73.0153251
    `;
    return {
      type: 'LOAD',
      payload: {
        request:{
          url:RestListApi + query,
          ...options
        }
      }
    }
  }
export function restDetailAction(queryParams, type) {
  
    const options = {
        headers: {...androidHeader},
        params: {
          ...queryParams,
          StrLocLatitude:'19.1105754',StrLocLongitude:'73.0174671',StrLocChannelCode:'001',IntLocCustomerId:21257,
        }
      };
    return {
      type: type,
      payload: {
        request:{
          url:RestDetailApi,
          ...options
        }
      }
    }
  }