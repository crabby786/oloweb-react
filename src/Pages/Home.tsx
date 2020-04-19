import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  restListAction,
  filterListAction,
} from "../Store/Actions/restListAction";
import { homeStyle } from "../Styles/jss/homePageStyles";
import { MainListItems } from "../Components/sidebarItems";
import {
  Divider,
  List,
  Hidden,
  CircularProgress,
  Badge,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { HomeRoutes, NavRoutes } from "../routes";
import MoreIcon from "@material-ui/icons/MoreVert";
import { extractQuery } from "../Constants/DishCoApi";
import TopNav from "../Components/appbar";

// const drawerWidth = 240;
// export interface Iprops extends WithStyles<typeof homeStyle> { };
declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

class HomePage extends React.Component<any, any> {
  state: any = {
    appBarOpen: true,
    MobileMoreAnchorEl: null,
    AnchorEl: null,
    isMenuOpen: false,
    isMobileMenuOpen: false,
    queryParams: {
      StrLocLocationName1: "",
      IntLocAvgMealRate: 0,
      IntLocCustomerId: 21257,
      StrLocDishName: "",
      StrLocLatitude: "19.032204151153564",
      StrLocLongitude: "73.01880598068237",
      StrLocCreditCardType: "",
      StrLocLocationName: "",
      StrLocCountryName: "",
      StrLocCuisines: "",
      StrLocCityName: "Navi Mumbai",
      StrLocIsFacilitieIds: "",
      IntLocLastAdevrtisementId: 0,
      IntLocOrderby: 2,
      DecimalLocTime: "",
      StrLocRestaurantName: "",
      IntLocNoOfRecords: 0,
    },
  };
  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      ...this.state,
      MobileMoreAnchorEl: event.currentTarget,
      isMobileMenuOpen: true,
    });
  };
  componentDidMount() {
    let queryParams = {};
    let api = extractQuery(
      "RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter?StrLocChannelCode=001&IntLocCustomerId=21257&StrLocCityName=Navi+Mumbai&IntLocLastAdevrtisementId=0&IntLocAvgMealRate=0&IntLocOrderby=2&StrLocLatitude=19.1110512&StrLocLongitude=73.0153251&IntLocNoOfRecords=0"
    );
    queryParams = { ...api.queryParams };
    let url = api.url;
    this.props.getRestList(this.state.queryParams, url);
  }

  setAppbarOpen = (isOpen: boolean) => {
    this.setState({ ...this.state, appBarOpen: isOpen });
  };
  handleMobileMenuClose = () => {
    this.setState({
      ...this.state,
      MobileMoreAnchorEl: null,
      isMobileMenuOpen: false,
    });
  };
  handleMenuClose = () => {
    this.setState({ ...this.state, AnchorEl: null, isMenuOpen: false });
    // this.handleMobileMenuClose();
  };
  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      ...this.state,
      AnchorEl: event.currentTarget,
      isMenuOpen: true,
    });
  };
  menuId = "primary-search-account-menu";
  mobileMenuId = "primary-search-account-menu-mobile";

  handleLogout = () => {
    let dataForNative = {
      logOut: true,
    };
    if (window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(JSON.stringify(dataForNative));
  };

  render() {
    const { classes, restData, match } = this.props;
    const { path, url, isExact, params } = match;

    return (
      <div className={classes.homeroot}>
        <TopNav />
        {restData.isLoading ? (
          <div className="preLoader">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div>
              {this.props.restData && this.props.restData.data != null ? (
                <Switch>
                  {NavRoutes.map((route, i) => (
                    <Route
                      key={"NavRoutes" + i}
                      path={path + route.path}
                      component={route.component}
                    ></Route>
                  ))}
                </Switch>
              ) : (
                <div className="preLoader">
                  <CircularProgress color="primary" />
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  // console.log(ownProps);
  // console.log(state);
  return {
    restData: state.restListReducer,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams: any, url) =>
      dispatch(filterListAction(queryParams, url)),
  };
};
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
