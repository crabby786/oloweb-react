import * as Yup from "yup";

export function getLocationAction() {
  
  const type = 'location'
  return (dispatch) => {
    dispatch({ type: `${type}_USER_LOADING`, shortType:type})
    const getLoc = ()=>  {
      return new Promise( (resolve, reject)=> {
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        
      } else {
        reject( (error) => {
          return  dispatch({ type: `${type}_USER_FAILURE`, payload: {errorObj:error, message:"Sorry, browser does not support geolocation!"} , shortType:type })
        })
      }
    })
  }
  return getLoc()
  .then((position) => {
    let { latitude, longitude } = position.coords;       
    return dispatch({ type: `${type}_USER_SUCCESS`, payload: {[type]:{
      Strloclatitude: latitude,
      strLocLongitude: longitude,
    }}, shortType:type }) 
  })
  .catch((error) => {
    
    let message = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        message = "An unknown error occurred.";
        break;
    }
    return  dispatch({ type: `${type}_USER_FAILURE`, payload: {errorObj:error, message} , shortType:type })
  });
  }
  
  
};

//set coockie
 export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



//____________________________form validators_______________________
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

 export const addressValidation = Yup.object({
  home: Yup.string("Enter House No.").required("Flat/House number is required"),
  line1: Yup.string("Enter Address"),
  pin: Yup.string("please enter valid pin")
      .max(6)
      .required("Pincode is required"),
  // email: Yup.string("Enter your email")
  //   .email("Enter a valid email")
  //   .required("Email is required")
});
// Handle HTTP errors since fetch won't.
// export function handleErrors(response) {
//   if(response.StatusCode !== 0) {
//     throw Error(response.Status)
//   }
//   return response
// }
// // axios test
// const axiosInstance = axios.create({
//   baseURL: 'https://...'
// })
// const isHandlerEnabled = (config={}) => {
//   return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
//     false : true
// }
// //  axiosInstance.get('/v2/api-endpoint', { handlerEnabled: false })
// const requestHandler = (request) => {
//   if (isHandlerEnabled(request)) {
//     // Modify request here
//     // request.headers['X-CodePen'] = 'https://codepen.io/teroauralinna/full/vPvKWe'
//   }
//   return request
// }
// axiosInstance.interceptors.request.use(
//   request => requestHandler(request)
// )
// const errorHandler = (error) => {
//   if (isHandlerEnabled(error.config)) {
//     // Handle errors
//   }
//   return Promise.reject({ ...error })
// }

// const successHandler = (response) => {
//   if (isHandlerEnabled(response.config)) {
//     // Handle responses
//   }
//   return response
// }

// axiosInstance.interceptors.response.use(
//   response => successHandler(response),
//   error => errorHandler(error)
// )

// export function handleAxiosErrors(request) {
//   axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
// }, function (error) {
//     switch (error.response.status) {
//         case 503 :
//             props.history.push('/503') 
//             break
//         default :
//             break
//     }
//     // Do something with response error
//     return Promise.reject(error);
// });
// }

