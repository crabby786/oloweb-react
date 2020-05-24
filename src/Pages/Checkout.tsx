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
import { d_homeDetails, d_TotalAmountObj, d_CheckTotalAmount } from "../Constants/dummy";
import {
  ICheckTotalAmount,
  RestaurantDeliveryList,
} from "../Models/RestListModel";
import { RestHeader } from "./comps/rest_detail_header";
import BillSection from "./comps/bill_section";
import { Cartlist } from "./comps/cart_list";

class CheckoutPage extends React.Component<any, any> {
  state = {
    isRegistered: false,
    mobile: 0,
    myCart: [],
    cartTotal: null,
    totalObj:d_CheckTotalAmount,
  };
  removeItem = (i) => {
    return null;
  };
  getOtp = (i) => {
    return null;
  };

  // static getDerivedStateFromProps(props, state) {
  //   let { restData } = props;
  //   let { storeUpdate } = state;
  //   return null;
  // }

  render() {
    const { restData } = this.props;
    const { myCart } = this.state;
    const restObj: RestaurantDeliveryList =
      d_homeDetails.RestaurantList[0].RestaurantDeliveryList[0];
    const TotalAmountObj: ICheckTotalAmount = d_TotalAmountObj;
    return (
      <div>
        {!restData.isLoading ? (
          <section className="all-partners">
            <div className="container">
              <div className="row">
                <div className="col-12">
                <div  className="float-right">
                    <Button color="primary" startIcon={<i className="fa fa-chevron-left" ></i>} >
                      Go back to order
                    </Button>
                  </div>
                  <RestHeader selectedRest={restObj}></RestHeader>
                  
                </div>
                {/* <div className="col-lg-8 col-md-8">
                  <Cartlist
                    myCart={this.state.myCart}
                    removeItem={this.removeItem}
                    cartTotal={this.state.cartTotal}
                  ></Cartlist>

                 </div> */}
                <div className="col-12">
                  <BillSection
                    cartTotal={this.state.cartTotal}
                    totalObj={d_CheckTotalAmount}
                    myCart={myCart}
                  ></BillSection>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="progress1" style={{ width: "100%" }}>
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
    changeLocation: (location) => dispatch(changeLocationAction(location, "")),
  };
};
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(CheckoutPage);
