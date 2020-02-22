

  const initialState = {
    isLoading:false,
    isError: false,
    data: null,
    AllRestaurantDishes:[] ,
  }

export const restListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case 'LOAD_RESTLIST_REQUEST':
        return { ...state, isLoading:true }
    case 'LOAD_RESTLIST_SUCCESS':
        return { ...state, ...payload, isLoading:false }
    case 'LOAD_RESTLIST_FAILURE':
        return { ...state, ...payload , isLoading:false, isError:true}
    default:
        return state
    }
}
export const restDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case 'GETDETAIL_REQUEST':
        return { ...state, isLoading:true }
    case 'GETDETAIL_SUCCESS':
        return { ...state, ...payload, isLoading:false }
    case 'GETDETAIL_FAILURE':
        return { ...state, ...payload , isLoading:false, isError:true}
    default:
        return state
    }
}
export const getMerchantListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case 'GETMERCHANTLIST_REQUEST':
        return { ...state, isLoading:true }
    case 'GETMERCHANTLIST_SUCCESS':
        // console.log('rdx', payload)
        return { ...state, ...payload, isLoading:false }
    case 'GETMERCHANTLIST_FAILURE':
        return { ...state, ...payload , isLoading:false, isError:true}
    default:
        return state
    }
}
export const SubAccountListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case 'GETSUBACCOUNTLIST_REQUEST':
        return { ...state, isLoading:true }
    case 'GETSUBACCOUNTLIST_SUCCESS':
        return { ...state, ...payload, isLoading:false }
    case 'GETSUBACCOUNTLIST_FAILURE':
        return { ...state, ...payload , isLoading:false, isError:true}
    default:
        return state
    }
}
