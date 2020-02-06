

const restListState = {
    isLoading:false,
    isError: false,
    restList: {} 
  }
  const initialState = {
    isLoading:false,
    isError: false,
    data: null 
  }

export const restListReducer = (state = restListState, { type, payload }) => {
    switch (type) {
    case 'LOAD_REQUEST':
        return { ...state, isLoading:true }
    case 'LOAD_SUCCESS':
        return { ...state, ...payload, isLoading:false }
    case 'LOAD_FAILURE':
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
        // console.log('rdx', payload)
        return { ...state, ...payload, isLoading:false }
    case 'GETDETAIL_FAILURE':
        return { ...state, ...payload , isLoading:false, isError:true}
    default:
        return state
    }
}
