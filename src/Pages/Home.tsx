import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import * as oloApi from "../Constants/OloApi";
import {
  getDataWithTypeAction,
} from "../Store/Actions/restListAction";
import { getLocationAction } from "../Store/Actions/helperAction";
import { GetFormatedAddress } from "../Constants/OloApi";
import { homeStyle } from "../Styles/jss/homePageStyles";
import { Switch, Route, withRouter, } from "react-router-dom";
import { NavRoutes } from "../routes";
import { AlertDialog } from "../Components/UiComps/alerts";
import { IhomeDetails, IrestData } from "../Models/RestListModel";

class HomePage extends React.Component<any, any> {
  readonly restData:IrestData = this.props.restData;
  // readonly FlavourCode = this.restData.homeDetails.MyPOSMenuDetail.IntMyPOSPUSHFlavourCode 

  // StrMyPOSPUSHFlavourDescription: "eMenu"// 1= "eMenu" 2="JustOrder"
  state = {
    img:'',
    location: {
      lattitute: null,
      longitude: null,
    },
    boolMyPOSTableValidate:false,
    StrMyPOSPUSHFlavourDescription: ["Olo","eMenu","JustOrder",],
    isLocation: false,
    storeUpdate:{homeDetails: false,},
    formatedAdd:{},
    queryParams:{Accountid:3385,Cityid:null,Locationid:null,Restaurantid:null,},
    isLoading:false,
    isError:false,
    tableList:[{PropPubTableCode:null}],
    statusText:""
  };
  handlePickImg = (e)=> {
    const {value} = e.target;
    this.setState({img:value});
    console.log(e.target.value);
  }
  
// let Qrcode = ?accountid=3372&restaurantid=642465&tablenumber=baddy%20court%20number%203
  static getDerivedStateFromProps (props, state) {
    if(props.restData.statusText !== state.statusText) {
      alert(props.restData.statusText)
      return {
        statusText:props.restData.statusText
      }
    }
    
    return null
  }
  componentDidMount = () => {
    if(this.props.restData.homeDetails.CityList.length < 1) {
    let query = { ...oloApi.getHomeDetailsParams };
    let url = oloApi.getHomeDetails;
    // let params = "?Accountid=3385&Cityid=1190&Locationid=1123&restaurantid=642465"&tablenumber=baddy%20court%20number%203;
    
    let params = this.props.location.search;
    if(params) {      
    let queryParams= {accountid:0,cityid:"",locationid:"",restaurantid:"", tablenumber:""}
    params = decodeURI(params).substr(1);
    let paramList:string[] = params.split('&');
    paramList.forEach((str)=> {
      let id = str.indexOf('=');
      let key = str.substring(0,id).toLowerCase();
      let val = str.substring(id + 1);
      queryParams[key] = (key.toLowerCase() === 'tablenumber') ? val : Number(val);
    } );
    if (queryParams.tablenumber) {
      let tableList = [ { PropPubTableNo: queryParams.tablenumber }]
      this.setState({tableList})
      this.props.dispatchSetData({
        tableList
      });
    }
    
    query.IntLocAccountId = queryParams.accountid ? queryParams.accountid : query.IntLocAccountId
    query.IntLocCityId =  queryParams.cityid 
    query.IntLocLocationId = queryParams.locationid 
    query.IntLocRestaurantId = queryParams.restaurantid 
    }
    else {
          this.props.getLocation()
          .then((obj) => {
                const { Strloclatitude, strLocLongitude } = obj.payload.location;
                const loc = { Strloclatitude, strLocLongitude };
                this.props.getDataWithParams(loc, GetFormatedAddress, "formatedAdd",{minLoading:true})
              })
          .catch((err) => console.log(err.message));
          
    }
    
    this.props.getData(query, url, "homeDetails")
    .then((obj)=> {
      const homeDetails:IhomeDetails = obj.payload.homeDetails;
      if(!homeDetails.CityList) {
        this.setState({isError:true});
        return;
      }
      else {
        this.pushDataToNative( { isLoading: false });
        if(homeDetails.MyPOSMenuDetail) {
          //if eMenu 
          if(homeDetails.MyPOSMenuDetail.IntMyPOSPUSHFlavourCode === 1 )
          {
            let restObj = homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj=> obj.RestaurantId === Number(query.IntLocRestaurantId) );
            let selectObj = {
              restId: query.IntLocRestaurantId,
              cityId: null,
              areaId: null,
              pickStatus: 'delivery',
              pickupTime: null,
            }
            let menuDetails = homeDetails.MyPOSMenuDetail
            this.props.dispatchSetData({restObj,selectObj,menuDetails})
            this.props.history.replace(`/restdetail/${query.IntLocRestaurantId}`);
            return;
          } 
          //if just order  
          else if(homeDetails.MyPOSMenuDetail.IntMyPOSPUSHFlavourCode === 2 )
          {
            let restObj = homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj=> obj.RestaurantId === Number(query.IntLocRestaurantId) );
            let selectObj = {
              restId: query.IntLocRestaurantId,
              cityId: null,
              areaId: null,
              pickStatus: 'delivery',
              pickupTime: null,
            }
            let menuDetails = homeDetails.MyPOSMenuDetail
            this.props.dispatchSetData({restObj,selectObj,menuDetails})
            this.props.history.replace(`/restdetail/${query.IntLocRestaurantId}`);
            return;
          } 
        }
      
      
    }
    })
    .catch(()=> this.setState({isError:true}) )
  }
    
    
  };
  
  requestCamera = ()=> {
    this.pushDataToNative({req:'camera'})
  } 

  private pushDataToNative(dataForNative) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(dataForNative))
      
    }
  }

  getLandingPageBanner(CityId,RestaurantId) {
    const { getLandingPageBannerParams, getLandingPageBanner } = oloApi;
    let params = { ...getLandingPageBannerParams };
    params.IntLocCityId = Number(CityId)
    params.IntLocRestaurantId =  Number(RestaurantId)
    return this.props.getDataWithParams(params,getLandingPageBanner, 'landingPageBanner', { minLoading: true });
    
  }

  handleLogout = () => {
    let dataForNative = {
      logOut: true,
    };
    if (window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(JSON.stringify(dataForNative));
  };

  render() {
    const { classes, restData } = this.props;
    
    return (
      <div className={classes.homeroot}>          
          {this.state.isError === false &&
          <main className={classes.content}>
            
            <div className={classes.container}>
              
              <Switch>
                {NavRoutes.map((route, i) => (
                  <Route
                    key={"NavRoutes" + i}
                    path={ route.path}
                    component={route.component}
                  ></Route>
                ))}
              </Switch>
            </div>

            {/* <FooterSection homeDetails= {restData.homeDetails} /> */}
          </main>
          
          }
          <AlertDialog open= {restData.isError} 
            handleClose={this.props.errorConfirmed}
           txt={restData.errorObj.Message || restData.errorObj.message || restData.errorObj.Error} />
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(ownProps);
  // console.log(state);
  return {
    restData: state.restListReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, other)),
      getLocation: () => dispatch(getLocationAction()),
      errorConfirmed: ()=> dispatch({type:'error_confirmed'}),
    dispatchSetData: (params) =>
      dispatch({type:'Set_Data', payload:params}),
  };
};
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HomePage);

//imp terms for this page
//sharedCookiesEnabled