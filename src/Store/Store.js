import {createStore, applyMiddleware, combineReducers} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// import {restListReducer} from './Reducers/restListReducer'
import { RestListApi, BaseApi } from '../Constants/DishCoApi'
import { androidHeader } from '../Constants/DishCoApi';
import {restListReducer,SubAccountListReducer, restDetailReducer, getMerchantListReducer} from './Reducers'

const client = axios.create({ 
  baseURL:BaseApi,
  responseType: 'json'
});
const rootReducer = combineReducers({
    restListReducer, 
    restDetailReducer, 
    getMerchantListReducer,
    SubAccountListReducer
})

export const store = createStore(
  rootReducer, //custom reducers
  applyMiddleware(    
    axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
    
  )
)