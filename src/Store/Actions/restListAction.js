import { RestListApi,MerchantApi, BaseApi, RestDetailApi } from '../../Constants/DishCoApi'
import { androidHeader } from '../../Constants/DishCoApi'

export function restListAction(queryParams) {
    const options = {
        headers: {...androidHeader},
        params: {
          StrLocChannelCode:'001',IntLocCustomerId:21257,
          StrLocCityName:'Navi Mumbai',
          IntLocLastAdevrtisementId:0,
          IntLocAvgMealRate:0,
          IntLocOrderby:2,
          StrLocLatitude:'19.1110512',
          StrLocLongitude:'73.0153251',
          IntLocNoOfRecords:0,
          ...queryParams,
        }
      };
    return {
      type: 'LOAD_RESTLIST',
      payload: {
        request:{
          url:RestListApi ,
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
export function getMerchantListAction(queryParams, type) {
  
    const options = {
        headers: {...androidHeader},
        params: {
          ...queryParams,
        }
      };
    return {
      type: type,
      payload: {
        request:{
          url:MerchantApi,
          ...options
        }
      }
    }
  }
export function getRestaurantLoginDetailsAction(queryParams, type) {
  
    const options = {
        headers: {...androidHeader},
        params: {
          ...queryParams,
        }
      };
    return {
      type: type,
      payload: {
        request:{
          url:MerchantApi,
          ...options
        }
      }
    }
  }
export function getDataAction(url,queryParams,type) {
  
    const options = {
        headers: {...androidHeader},
        params: {
          ...queryParams,
        }
      };
    return {
      type: type,
      payload: {
        request:{
          url,
          ...options
        }
      }
    }
  }
