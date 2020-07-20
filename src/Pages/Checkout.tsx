import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  changeLocationAction,
  getDataWithTypeAction,
} from "../Store/Actions/restListAction";
import { homeStyle } from "../Styles/jss/homePageStyles";
import { LinearProgress, Button } from "@material-ui/core";
// import { d_homeDetails, d_TotalAmountObj, d_CheckTotalAmount, d_selectedRest } from "../Constants/dummy";
import {
  ICheckTotalAmount,
  RestaurantDeliveryList,
  IrestData,
} from "../Models/RestListModel";
import { RestHeader } from "./comps/rest_detail_header";
import BillSection from "./comps/bill_section";
import { withRouter } from "react-router";

class CheckoutPage extends React.Component<any, any> {
  readonly restData:IrestData = this.props.restData;
  state = {
    isRegistered: false,
    mobile: 0,
    myCart: [],
    cartTotal: null,
    totalObj: {...this.restData.totalAmountObj},
  };

  // static getDerivedStateFromProps(props, state) {
  //   let { restData } = props;
  //   let { storeUpdate } = state;
  //   return null;
  // }

  render() {
    const { restData } = this.props;
    const { myCart } = this.state;
    const restObj: RestaurantDeliveryList = this.restData.restObj;
    const totalAmountObj: ICheckTotalAmount = this.restData.totalAmountObj;
    return (
      <div>
        {!restData.isLoading ?
          <section className="all-partners">
            <div className="container">
              <div className="row border-bottom">
                <div className="col-12">
              <RestHeader nav= {true} goBack={() => this.props.history.goBack()} selectedRest={restObj}></RestHeader>
              </div>
                {/* <div className="col-lg-8 col-md-8">
                  <Cartlist
                    myCart={this.state.myCart}
                    removeItem={this.removeItem}
                    cartTotal={this.state.cartTotal}
                  ></Cartlist>

                 </div> */}
                 </div>
                 <div className="row" >
                <BillSection
                  cartTotal={this.state.cartTotal}
                  totalObj={this.restData.totalAmountObj}
                  myCart={myCart}
                ></BillSection>
              </div>
            </div>
          </section>
          :
          <div className="progress1" style={{ width: "100%" }}>
            <LinearProgress color="primary" />
          </div>
        }
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
    changeLocation: (location) => dispatch(changeLocationAction(location, "")),
  };
};
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CheckoutPage);
