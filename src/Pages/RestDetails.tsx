import { withStyles, CircularProgress } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import Tab1 from "../Components/custom/tab1";
import MealTab from "../Components/custom/meal_tab";
import { GetHDMenuHeadListParams, GetHDMenuItemListParams, GetMenuDetailsSingleApi, GetMenuDetailsSingleApiParams } from "../Constants/OloApi";
import { IhomeDetails } from "../Models/RestListModel";
import { changeLocationAction, getDataWithTypeAction, getDataWithTypeAllAction } from "../Store/Actions/restListAction";
import { homeStyle } from "../Styles/jss/homePageStyles";
import { RestHeader } from "./comps/rest_detail_header";
import { AlertDialog } from "../Components/UiComps/alerts";

class RestDetails extends React.Component<any,any> {
state = {
    expanded: false,
    index: 0,
    cartTotal: 0,
    restId: 642420,
    pickupTime:'12:06',
    MenuItemListLength: 0,
    GetHDMenuItemListParams: GetHDMenuItemListParams,
    GetHDMenuHeadListParams: GetHDMenuHeadListParams,
    menuDetails: {MenuHeadList: [],MenuItemList: [],MenuItemModifierList: []},
    cartList: [],
    currentMod: [],
    checked: [0],
    isOpenDr: false,
    errorObj:{isError:false, errorMsg:''}
  };
  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    let { MenuHeadList,MenuItemList,MenuItemModifierList } = restData.menuDetails;
    if ( MenuHeadList && state.menuDetails.MenuHeadList != MenuHeadList ) {
        return {menuDetails:{...state.menuDetails,MenuHeadList,MenuItemList,MenuItemModifierList }}
    }
    return null
  }
  constructor(props) {
    super(props)
    
  }
  componentDidMount = () => {
    const { menuDetails} = this.state
    if(menuDetails.MenuHeadList.length < 1 )
    this.getMenuHeadList();
  };
  getMenuHeadList = () => {
    const {restId}= this.state;
    let query  = {...GetMenuDetailsSingleApiParams,IntLocRestaurantId:restId}
    let reqParams = {minLoading:true}
    this.props
      .getDataWithParams(query, GetMenuDetailsSingleApi, "menuDetails",{...reqParams})
  };
  

   homeDetails:IhomeDetails = this.props.restData.homeDetails;
  // selectedRest = this.homeDetails.RestaurantList[0].RestaurantDeliveryList.find((rest) => rest.RestaurantId === this.state.restId);
  selectedRest = {
    "IsDeliver":0,
    "RestaurantId":642420,
    "AccountId":"524",
    "GroupId":"524",
    "RestaurantName":"Cafe Sanchit",
    "RestaurantLogo":"RL-6166c889-b2be-4788-afe5-b85d70a7b382",
    "Cuisines":"",
    "Location":"",
    "City":"Navi Mumbai",
    "MinOrder":"180",
    "MinTime":"120",
    "IsRecentOrder":1,
    "TotalPledge":0,
    "Distance":"0",
    "DeliveryFromTime":"0",
    "DeliveryToTime":"0",
    "FeedbackFacility":0,
    "MorningDeliveryFromTime":"12:00 AM",
    "MorningDeliveryToTime":"12:00 AM",
    "EveningDeliveryFromTime":"12:00 AM",
    "EveningDeliveryToTime":"12:00 AM",
    "OpeningTime":" 2:00 AM",
    "ClosingTime":"12:30 PM",
    "MinDeliveryTime":120,
    "HomeDeliveryPickTime":"",
    "LocationId":1162
 };

  render() {
    const { restData } = this.props;
    return (
      <section className="all-partners">
        {restData.isError ? (
          <div className="container">
            <div className="row">
              <div className="col-12">{restData.errorObj.message}</div>
            </div>
          </div>
        ) : (
          <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                {this.selectedRest.RestaurantId && (
                  <RestHeader selectedRest={this.selectedRest} ></RestHeader>
                )}

                {/* <Tab1 restObj={this.selectedRest}></Tab1> */}
                {
              restData.menuDetails.MenuHeadList.length ? (<> <MealTab /> </>) : (
            <div className='content-loader1'>
            <CircularProgress />
            </div> 
            ) }
              </div>
            </div>
          </div>
          <AlertDialog
          txt={this.state.errorObj.errorMsg}
          open={this.state.errorObj.isError}
          handleClose={() =>
            this.setState({
              errorObj: { ...this.state.errorObj, isError: false },
            })
          }
        />
          
          </>
        )}
      </section>
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
    getDataWithParams: (queryParams, url, type, others) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, others)),
      getAllDataWithParams: (queryParams, url, type, others) =>
      dispatch(getDataWithTypeAllAction(queryParams, url, type, others)),
    changeLocation: (location) => dispatch(changeLocationAction(location, "")),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(RestDetails);
