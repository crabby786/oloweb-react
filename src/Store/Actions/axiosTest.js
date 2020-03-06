//usefull option props
const options = {
    method: 'post',
    url: '/login',
    headers: {'X-Custom-Header': 'value'},
    data: {
      firstName: 'Finn',
    },
    transformRequest: [(data, headers) => {
        return data;
      }],
    transformResponse: [(data) => {
      return data;
    }]
  };
//----------------------------------------------------------------------------------------------
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])
axios.post('/login', {
    firstName: 'Finn',
    lastName: 'Williams'
  });
//----------------------------------------------------------------------------------------------
// execute simultaneous requests 
axios.all([
    axios.get('https://api.github.com/users/mapbox'),
    axios.get('https://api.github.com/users/phantomjs')
  ])
  .then(responseArr => {
    //this will be executed only when all requests are complete
    console.log('Date created: ', responseArr[0].data.created_at);
    console.log('Date created: ', responseArr[1].data.created_at);
  })

//axios.all with spread
.then(axios.spread((user1, user2) => {
    console.log('Date created: ', user1.data.created_at);
    console.log('Date created: ', user2.data.created_at);
  }));
//----------------------------------------------------------------------------------------------
// Cancel axios Request
const source = axios.CancelToken.source();

axios.get('https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif', {
  cancelToken: source.token
}).catch(thrown => {
  if (axios.isCancel(thrown)) {
    console.log(thrown.message);
  } else {
    // handle error
  }
});

// cancel the request (the message parameter is optional)
source.cancel('Request canceled.');
//----------------------------------------------------------------------------------------------

// if needed use cancel Token constructor
axios.get('https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif', {
  // specify a cancel token
  cancelToken: new CancelToken(c => {
    // this function will receive a cancel function as a parameter
    cancel = c;
  })
}).catch(thrown => {
  if (axios.isCancel(thrown)) {
    console.log(thrown.message);
  } else {
    // handle error
  }
});

// cancel the request
cancel('Request canceled.');

//-----------------------------------------------------------------------------------------------------------
//progressbar with axios
{/* <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css" />

<script src="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/index.js"></script> */}

loadProgressBar()

const url = 'https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif';

function downloadFile(url) {
  axios.get(url)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}

downloadFile(url);

// progressbar css
// #nprogress .bar {
//     background: red !important;
// }
// #nprogress .peg {
//     box-shadow: 0 0 10px red, 0 0 5px red !important;
// }
// #nprogress .spinner-icon {
//     border-top-color: red !important;
//     border-left-color: red !important;
// }
//-----------------------------------------------------------------------------------------------------------

// declare a response interceptor
axios.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
  
    return response;
  }, error => {
    // handle the response error
    return Promise.reject(error);
  });
  
  // sent a GET request
  axios.get('https://api.github.com/users/mapbox')
    .then(response => {
      console.log(response.data.created_at);
    });

//-----------------------------------------------------------------------------------------------------------
// declare a request interceptor
axios.interceptors.request.use(config => {
    // perform a task before the request is sent
    console.log('Request was sent');
  
    return config;
  }, error => {
    // handle the error
    return Promise.reject(error);
  });
  
  // sent a GET request
  axios.get('https://api.github.com/users/mapbox')
    .then(response => {
      console.log(response.data.created_at);
    });