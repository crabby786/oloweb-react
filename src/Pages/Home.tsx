import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  changeLocationAction,
  getDataWithTypeAction,
} from "../Store/Actions/restListAction";
import { homeStyle } from "../Styles/jss/homePageStyles";
import { Switch, Route, withRouter, } from "react-router-dom";
import { NavRoutes } from "../routes";
import * as oloApi from "../Constants/OloApi";
import FooterSection from "../Components/custom/footer";
import { LinearProgress } from "@material-ui/core";
import { getLocationAction } from "../Store/Actions/helperAction";
import TopNav from "../Components/appbar";
import { GetFormatedAddress } from "../Constants/OloApi";
import { AlertDialog } from "../Components/UiComps/alerts";
declare global {
  interface Window {
    ReactNativeWebView;
  }
}
class HomePage extends React.Component<any, any> {
  state = {
    location: {
      lattitute: null,
      longitude: null,
    },
    isLocation: false,
    storeUpdate:{homeDetails: false,},
    formatedAdd:{}
  };

  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    let { storeUpdate } = state;
    return null;
  }

// https://shawmanolo.page.link/CafeSanchit - AccountID
// https://shawmanolo.page.link/CafeSanchitGoa - CityID
// https://shawmanolo.page.link/CafeSanchitAssagaon - location
// https://shawmanolo.page.link/CafeSanchitOutlet - Restaurant

  
  componentDidMount = () => {
    let query = { ...oloApi.getHomeDetailsParams };
    switch (this.props.location.pathname) {
      case '/CafeSanchitGoa':
        query = {...query,IntLocAccountId:3385,IntLocCityId:1190 }
        break;
      case '/CafeSanchitAssagaon':
        query = {...query,IntLocAccountId:3385,IntLocCityId:1190 ,IntLocLocationId:1123}
        break;
        case '/CafeSanchit':{
          query = {...query,IntLocAccountId:3385}
          this.props.getLocation()
          .then((obj) => {
                const { Strloclatitude, strLocLongitude } = obj.payload.location;
                const loc = { Strloclatitude, strLocLongitude };
                this.props.getDataWithParams(loc, GetFormatedAddress, "formatedAdd",{minLoading:true})
              })
          .catch((err) => console.log(err.message));
          }
          break;
      case '/CafeSanchitOutlet':
        query = {...query,IntLocAccountId:3385,IntLocCityId:1190 ,IntLocLocationId:1123,IntLocRestaurantId:642477}
        break;
    
      default:
        query = {...query,IntLocAccountId:3385 }
        break;
    }
    let url = oloApi.getHomeDetails;
    // if(this.props.restData.allCities.length < 1)
    this.props.getData(query, url, "homeDetails");
  };

  handleLogout = () => {
    let dataForNative = {
      logOut: true,
    };
    if (window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(JSON.stringify(dataForNative));
  };

  render() {
    const { classes, match,restData } = this.props;
    const { path } = match;
    
    return (
      <div className={classes.homeroot}>
        {!restData.isLoading ? (<>
          <TopNav />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
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

            <FooterSection homeDetails= {restData.homeDetails} />
          </main>
          <AlertDialog open= {restData.isError} 
          handleClose={this.props.errorConfirmed}
           txt={restData.errorObj.Message || restData.errorObj.Error} />
        </>)
         : (
          <div className="progress1" style= {{width:"100%"}}>
            <LinearProgress color="primary" />
          </div>
        )}
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
      errorConfirmed: ()=> dispatch({type:'error_confirmed'})
  };
};
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HomePage);
