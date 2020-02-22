import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// import {restListReducer} from './Reducers/restListReducer'
import { androidHeader,RestListApi, BaseApi } from '../Constants/DishCoApi'
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
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(axiosMiddleware(client)),
);
export const store = createStore(
  rootReducer, enhancer
)