import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
// import {restListReducer} from './Reducers/restListReducer'
import { BaseApi } from '../Constants/DishCoApi'
import {restListReducer,SubAccountListReducer,userReducer, restDetailReducer, getMerchantListReducer,filteredListReducer} from './Reducers'

const rootReducer = combineReducers({
    restListReducer, 
    restDetailReducer, 
    getMerchantListReducer,
    SubAccountListReducer,
    filteredListReducer,
    userReducer
})
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  // applyMiddleware(axiosMiddleware(client,middlewareConfig)),
  applyMiddleware(thunk),
);
export const store = createStore(
  rootReducer, enhancer
)