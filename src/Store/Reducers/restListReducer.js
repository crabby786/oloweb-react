  const initialState = {
  isLoading: true,
  minLoading: false,
  isError: false,
  data: null,
  status: 200,
  statusText: "",
  Strloclatitude: "",
  strLocLongitude: "",
  errorMsg: "",
  errorObj:{Message:""},
  homeDetails: {CityList:[],LocationList:[],RestaurantList:[{RestaurantDeliveryList:[]}]},
  selectObj: {
        restId: null,
        cityId: null,
        areaId: null,
        pickStatus: 'delivery',
        pickupTime: null,
  },
  restObj:{},
  custObj:{},
  landingPageBanner:{ImageAdvertisement:[]},
  myCart:[],
  updatedMenuItemList:[],
  orderStatus:[],
  cartTotal:0,
  formatedAdd:{CityId:null},
  totalAmountObj:{},
  restList: { },
  menuDetails: {MenuHeadList: [],MenuItemList: [],MenuItemModifierList: []},
  insertOrderDetails:{MessageCode:"",Message:""},
  PropMenuItemDetails:"",
  PropCounterSaleOrderDetail:"",
  tableList:[],
};
const userState = {
  location: {
    Strloclatitude: "",
    strLocLongitude: "",
  },
  status: 200,
  statusText: "",
  errorMsg: "",
  userLoading:false,
  minLoading:false,
  isError:false
}
const restState = {
  restObj:{},
  selectObj:{},
  formatedAdd:{},
  restList: { RestaurantDeliveryList: [], StatusCode: 0 },
  menuDetails: {MenuHeadList: [],MenuItemList: [],MenuItemModifierList: []},
  IntLocRestaurantId:642420,
}

export const restListReducer = (state = initialState, action) => {
  const { type, payload, shortType } = action;
  switch (type) {
    case `${shortType}_LOADING`:
      return { ...state, ...payload, isLoading: true };
    case `${shortType}_SUCCESS`:
      return { ...state, ...payload, isLoading: false };
    case `${shortType}_FAILURE`:
      return { ...state, ...payload, isLoading: false, isError: true };
    case `${shortType}_MIN_LOADING`:
      return { ...state, ...payload, minLoading: true };
    case `${shortType}_MIN_SUCCESS`:
      return { ...state, ...payload, minLoading: false };
    case `${shortType}_MIN_FAILURE`:
      return { ...state, ...payload, minLoading: false, isError: true };
    case `error_confirmed`:
      return { ...state, isError: false };
    case "set_restdetail":
      return { ...state, ...payload };
    case "Set_Data":
      return { ...state, ...payload };
    case "local_error":
      return { ...state, ...payload,isError:true };
    default:
      return state;
  }
};

export const userReducer = (state = userState, action) => {
  const { type, payload, shortType } = action;
  switch (type) {
    case `${shortType}_USER_LOADING`:
      return { ...state, ...payload, userLoading: true };
    case `${shortType}_USER_SUCCESS`:
      return { ...state, ...payload, userLoading: false };
      case `${shortType}_USER_FAILURE`:
        return { ...state, ...payload, userLoading: false, isError: true };
        case `${shortType}_USER_MIN_LOADING`:
          return { ...state, ...payload, minLoading: true };
          case `${shortType}_USER_MIN_SUCCESS`:
            return { ...state, ...payload, minLoading: false };
            case `${shortType}_USER_MIN_FAILURE`:
              return { ...state, ...payload, minLoading: false, isError: true };
        case `set_customer`:
          return { ...state, ...payload, userLoading: false };
    default:
      return state;
  }
};

export const filteredListReducer = (
  state = initialState,
  { type, payload }
) => {
  return state;
};
export const restDetailReducer = (state = restState, { type, payload }) => {
  switch (type) {
    case "set_restdetail":
      return { ...state, ...payload };
    case "GETDETAIL_SUCCESS":
      return { ...state, ...payload, isLoading: false };
    case "GETDETAIL_FAILURE":
      return { ...state, ...payload, isLoading: false, isError: true };
    default:
      return state;
  }
};
export const getMerchantListReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "GETMERCHANTLIST_REQUEST":
      return { ...state, isLoading: true };
    case "GETMERCHANTLIST_SUCCESS":
      return { ...state, ...payload, isLoading: false };
    case "GETMERCHANTLIST_FAILURE":
      return { ...state, ...payload, isLoading: false, isError: true };
    default:
      return state;
  }
};
export const SubAccountListReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "GETSUBACCOUNTLIST_REQUEST":
      return { ...state, isLoading: true };
    case "GETSUBACCOUNTLIST_SUCCESS":
      return { ...state, ...payload, isLoading: false };
    case "GETSUBACCOUNTLIST_FAILURE":
      return { ...state, ...payload, isLoading: false, isError: true };
    default:
      return state;
  }
};
