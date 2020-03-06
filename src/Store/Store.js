import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
// import {restListReducer} from './Reducers/restListReducer'
import { androidHeader,RestListApi, BaseApi } from '../Constants/DishCoApi'
import {restListReducer,SubAccountListReducer, restDetailReducer, getMerchantListReducer,filteredListReducer} from './Reducers'

const client = axios.create({ 
  baseURL:BaseApi,
  responseType: 'json'
});
const rootReducer = combineReducers({
    restListReducer, 
    restDetailReducer, 
    getMerchantListReducer,
    SubAccountListReducer,filteredListReducer
})
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const middlewareConfig = {

}
const enhancer = composeEnhancers(
  // applyMiddleware(axiosMiddleware(client,middlewareConfig)),
  applyMiddleware(thunk),
);
export const store = createStore(
  rootReducer, enhancer
)