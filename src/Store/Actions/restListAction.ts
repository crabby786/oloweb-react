import { RestListApi, MerchantApi, BaseApi, RestDetailApi } from '../../Constants/DishCoApi'
import * as dishcoApi from '../../Constants/DishCoApi'
import { androidHeader } from '../../Constants/DishCoApi'
import axios from 'axios'
import * as oloApi from "../../Constants/OloApi";

export var clientError = {Message: "An error has occurred."}
export function getDataWithTypeAction(queryParams, url,type,others?) {

  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    if(others && others.minLoading )
    {
      
      dispatch({ type: `${type}_MIN_LOADING`, shortType:type,loadCode:others.loadCode});
      return axios.get(BaseApi + url, { ...options, })
      .then((resp:any) => {
        if(resp.Message && resp.Message === clientError.Message) {
          let errorMsg = resp.Message;
          // let errorMsg = others.errorMsg || resp.Message;
          return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:resp} , shortType:type })
          
        }
        else {
          return dispatch({ type: `${type}_MIN_SUCCESS`, payload: {[type]:resp.data}, shortType:type })
        }
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }

    else {
      dispatch({ type: `${type}_LOADING`, shortType:type});
      return axios.get(BaseApi + url, { ...options, })
      .then((resp) => {
        return dispatch({ type: `${type}_SUCCESS`, payload: {[type]:resp.data}, shortType:type })
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }
  }
}
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
      axios.get(baseUrl + dishcoApi.GetFormatedAddress_Api, { ...options, params: { Strloclattitute: query.Strloclattitute, Strloclongitude: query.Strloclongitude } }),
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
        ...oloApi.GetRestuarantListParams,
        ...queryParams,
      }
    };
    
    return axios.get(BaseApi + url, { ...options, })
      .then((resp:any) => {
        if(resp.RestaurantDeliveryList && resp.RestaurantDeliveryList === null)
         return dispatch({ type: 'LOAD_RESTLIST_FAILURE', payload: {status: 404, statusText: "Sorry, No record found"} });
        else return dispatch({ type: 'FILTER_RESTLIST_SUCCESS', payload: resp })
      }
      )
      .catch(err=> dispatch({ type: 'LOAD_RESTLIST_FAILURE', payload: err }) )
  }
}

//2axios.all
export function getDataWithTypeAllAction(queryParams, url,type,list) {  
  return (dispatch) => {
    dispatch({ type: `${type}_MIN_LOADING`, shortType:type});
    const options = {headers: { ...androidHeader }};
    let reqList = [];
    
     queryParams.map((params,i) => {
      return reqList.push(axios.get(BaseApi + url, { ...options,params: {...params }}))
    })
     return axios.all(reqList)
    .then((resp) => {
      let disObj = { 
        type: `${type}_MIN_SUCCESS`, 
        payload: {[type]:resp}, 
        shortType:type 
      };
      return dispatch(disObj)
    })
    .catch(err=>{
      return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:err} , shortType:type })
    } )
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
//axios.all
export function changeLocationAction(loc,url) {
  return (dispatch) => {
    dispatch({ type: 'change_loc_start'})
    
    if (loc.isError) {
      return dispatch({ type: 'change_loc_failed', payload: { errorMsg:loc.message} })
    } else {
      return dispatch({ type: 'change_loc_success', payload: loc })
    }
  }
}
//post data
export function postData(postObj) {
  //used data as query params
  const {type,url,data} = postObj
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {...data}
    };
    if( postObj.minLoading )
    {
      dispatch({ type: `${type}_MIN_LOADING`, shortType:type});
      return axios.post(BaseApi + url,null, { ...options, })
      .then((resp) => {
        let payload= postObj.tempData ? {} : {[type]:resp.data};
        return dispatch({ type: `${type}_MIN_SUCCESS`, payload, shortType:type })
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }

    else {
      dispatch({ type: `${type}_LOADING`, shortType:type});
      return axios.post(BaseApi + url,null, { ...options, })
      .then((resp) => {
        let payload= postObj.tempData ? {} : {[type]:resp.data};
        return dispatch({ type: `${type}_SUCCESS`, payload, shortType:type })
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }
  }
  }
  
