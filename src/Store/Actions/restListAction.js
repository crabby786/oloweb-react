import { RestListApi, MerchantApi, BaseApi, RestDetailApi } from '../../Constants/DishCoApi'
import * as dishcoApi from '../../Constants/DishCoApi'
import { androidHeader } from '../../Constants/DishCoApi'
import axios from 'axios'


export const appLaunchAction = () => {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      // transformResponse: [(data) => {      return data;    }]
    };
    const query = dishcoApi.appLaunchParams;
    const baseUrl = dishcoApi.BaseApi;
    return axios.all([
      axios.get(baseUrl + dishcoApi.DishCoMenuList_Api, { ...options, params: { IntLocFlag: query.IntLocFlag, IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.RestaurantLogin_Api, { ...options, params: { IntLocFlag: query.IntLocFlag, IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.AccountDetailsByCustId_Api, { ...options, params: { IntLocFlag: query.IntLocFlag, IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.GetFormatedAddress_Api, { ...options, params: { Strloclatitude: query.Strloclatitude, Strloclongitude: query.Strloclongitude } }),
      axios.get(baseUrl + dishcoApi.GetAllCountries_Api, { ...options }),
      axios.get(baseUrl + dishcoApi.GetAllCities_Api, { ...options, params: { intLocCountryId: query.intLocCountryId } }),
      axios.get(baseUrl + dishcoApi.CityId_Api, { ...options, params: { StrLocCityName: query.StrLocCityName } }),
      axios.get(baseUrl + dishcoApi.GetCuisinesAndCreditCardTypes_Api, { ...options }),
      axios.get(baseUrl + dishcoApi.CheckPledgeFlag_Api, { ...options, params: { IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.GetNoOfRestaurant_Api, { ...options, params: { StrLocCity: query.StrLocCity, StrLocLoction: query.StrLocLoction } }),
      axios.get(baseUrl + dishcoApi.GetCustomerCheckFlag_Api, { ...options, params: { IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.HDCheckOnlineOrderFacility_Api, { ...options, params: { IntLocCityId: query.IntLocCityId, IntLocCustomerId: query.IntLocCustomerId } }),
      axios.get(baseUrl + dishcoApi.GetFunPubNoOfRestaurant_Api, { ...options, params: { StrLocCity: query.StrLocCity, StrLocLoction: query.StrLocLoction } }),
    ])
      .then(responseArr => {
        dispatch({
          type: "FETCH_PRODUCT_LISTINGS",
          payload: responseArr
        })
      })
      .catch(err => {
        console.log('error: ', err);
      })
  }
}
export function restListAction(queryParams) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        StrLocChannelCode: '001', IntLocCustomerId: 21257,
        StrLocCityName: 'Navi Mumbai',
        IntLocLastAdevrtisementId: 0,
        IntLocAvgMealRate: 0,
        IntLocOrderby: 2,
        StrLocLatitude: '19.1110512',
        StrLocLongitude: '73.0153251',
        IntLocNoOfRecords: 0,
        ...queryParams,
      }
    };
    axios.get(RestListApi, { ...options, })
      .then((resp) => dispatch({ type: 'LOAD_RESTLIST_SUCCESS', payload: resp }))
  }
}
export function filterListAction(queryParams, url) {
  return (dispatch,getState) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        // StrLocChannelCode:'001',IntLocCustomerId:21257,
        // StrLocCityName:'Navi Mumbai',
        // IntLocLastAdevrtisementId:0,
        // IntLocAvgMealRate:0,
        // IntLocOrderby:2,
        // StrLocLatitude:'19.1110512',
        // StrLocLongitude:'73.0153251',
        // IntLocNoOfRecords:0,
        ...queryParams,
      }
    };
    return axios.get(BaseApi + url, { ...options, })
      .then((resp) => {
        if(resp.AllRestaurantDishes === null)
         return dispatch({ type: 'LOAD_RESTLIST_FAILURE', payload: {status: 404, statusText: "Sorry, No record found"} });
        else return dispatch({ type: 'FILTER_RESTLIST_SUCCESS', payload: resp })
      }
      )
      .catch(err=> dispatch({ type: 'LOAD_RESTLIST_FAILURE', payload: err }) )
  }
}
export function restDetailAction(queryParams, type) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
        StrLocLatitude: '19.1105754', StrLocLongitude: '73.0174671', StrLocChannelCode: '001', IntLocCustomerId: 21257,
      }
    };
    return axios.get(BaseApi + RestDetailApi, { ...options, })
      .then((resp) => dispatch({ type: type + '_SUCCESS', payload: resp }))
  }
}
export function getMerchantListAction(queryParams, type) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    return axios.get(BaseApi + MerchantApi, { ...options, })
      .then((resp) => dispatch({ type: type + '_SUCCESS', payload: resp }))
  }
}
export function getRestaurantLoginDetailsAction(queryParams, type) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    return axios.get(BaseApi + MerchantApi, { ...options, })
      .then((resp) => dispatch({ type: type + '_SUCCESS', payload: resp }))
  }
}
export function getDataAction(url, queryParams, type) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    return axios.get(BaseApi + url, { ...options, })
      .then((resp) => dispatch({ type: type + '_SUCCESS', payload: resp }))
  }
}
