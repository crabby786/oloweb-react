import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { withStyles, Button,Switch, CircularProgress, FormControlLabel } from "@material-ui/core";
import { IMenuHeadListWithItems ,MenuItemList} from "../../Models/restDetailModel";
import { imgBase } from "../../Constants/DishCoApi";
import FullScreenDialog from "../full_dialog";
import MealTab from "./meal_tab";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { HDCheckTotalAmountParams, HDCheckTotalAmount } from "../../Constants/OloApi";
import { RestaurantDeliveryList,  ICheckTotalAmount} from "../../Models/RestListModel";
import { d_TotalAmountObj } from "../../Constants/dummy";
import { TabPanel,a11yProps } from "../UiComps/VerticalTabs";


class Tab1 extends React.Component<any, any> {
  state = {
    value: 0,
    menuTabValue: 0,
    isDialogeOpen:false,
    filter:{isVeg:false},
    cartTotal: 0,
    myCart: [],
    itemAmt: 0,
    itemQty: 1,
    showCounter: { PropMenuItemCode: "", PropPubMenuHeadCode: "" },
  };

  
  handleChangeTab = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({
      ...this.state,
      value,
    });
  };
  handleChangeMenuTab = (
    event: React.ChangeEvent<{}>,
    menuTabValue: number
  ) => {
    this.setState({
      ...this.state,
      menuTabValue,
    });
  };
  //tobe deleted
  showCounter = (obj?, reset?: boolean) => {
    if (reset) {
      this.setState({
        ...this.state,
        showCounter: { PropPubMenuHeadCode: "", PropMenuItemCode: "" },
      });
    } else {
      this.setState({
        ...this.state,
        showCounter: {
          PropPubMenuHeadCode: obj.PropPubMenuHeadCode,
          PropMenuItemCode: obj.PropMenuItemCode,
        },
      });
    }
  };

  
  
  
  render() {
    const { value, menuTabValue } = this.state;
    const { classes, restObj, restData } = this.props;
      
    return (
      <div className="all-tabs">
        <Tabs
          classes={{ indicator: classes.hrTabIndicator }}
          value={value}
          onChange={this.handleChangeTab}
          className="nav nav-tabs"
          aria-label="simple tabs example"
          
        >
          <Tab label="My Order" {...a11yProps(0)} />
          <Tab label="Menu" {...a11yProps(1)} />
          <Tab className="nav-item" label="Overview" {...a11yProps(2)} />
          <Tab label="Photos" {...a11yProps(3)} />
        </Tabs>
        <div className="tab-content">
          <TabPanel value={value} index={0}>
            {
              restData.menuDetails.MenuHeadList.length ? (<> <MealTab /> </>) : (
            <div className='content-loader1'>
            <CircularProgress />
            </div> 
            ) }
            
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="tab-pane" id="menu">
              <div className="restaurants-detail-bg m-bottom">
                <h4>Restaurant Menu Card</h4>
                <p style={{ fontWeight: 500 }}>2 Images</p>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="tabbable tabs-left">
                        <ul className="nav nav-tabs flex-column">
                          <li className="active">
                            <a href="#menu-1" data-toggle="tab">
                              <div className="menu-thumbs">
                                <img
                                  src="/assets/images/meals/logo_01.jpg"
                                  className="img-responsive"
                                  alt=""
                                />
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="#menu-2" data-toggle="tab">
                              <div className="menu-thumbs">
                                <img
                                  src="/assets/images/restaurant-detail/menu-logo-2.jpg"
                                  className="img-responsive"
                                  alt=""
                                />
                              </div>
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane active" id="menu-1">
                            <div className="menu-img-view">
                              <img
                                src="/assets/images/restaurant-detail/menu-1.jpg"
                                className="img-responsive"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="tab-pane" id="menu-2">
                            <div className="menu-img-view">
                              <img
                                src="/assets/images/restaurant-detail/menu-2.jpg"
                                className="img-responsive"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className="tab-pane active" id="overview">
              <div className="restaurants-detail-bg">
                <h4>About Restaurant</h4>
                <div className="overview-details">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="flex-dt">
                          <ul className="view-dt">
                            <li>Name</li>
                            <li>Opening Hours</li>
                            <li> City </li>
                            <li>Cuisines</li>
                          </ul>
                          <ul className="view-dt">
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                          </ul>
                          <ul className="view-dt-1">
                            <li> {restObj.RestaurantName} </li>
                            <li>
                              {" "}
                              {restObj.OpeningTime +
                                " To" +
                                (parseInt(restObj.ClosingTime) - 12) +
                                " PM"}{" "}
                            </li>
                            <li> {restObj.City} </li>
                            <li> {restObj.Cuisines} </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="flex-dt">
                          <ul className="view-dt">
                            <li>Phone Number</li>
                            <li>Status</li>
                            <li>Address</li>
                          </ul>
                          <ul className="view-dt">
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                          </ul>
                          <ul className="view-dt-1">
                            <li>+91 123 456 7890</li>
                            <li>Online</li>
                            <li>India</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="restaurants-detail-bg">
                <h4>Description</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  vehicula ut nisl id aliquam. Phasellus vestibulum ante eget
                  aliquet sodales. Aliquam erat enim, venenatis eget fringilla
                  ac, euismod ac sapien. Sed tincidunt diam eget orci finibus
                  blandit. Sed eget interdum quam. Proin arcu dolor, eleifend ut
                  commodo sed, accumsan et ipsum. Mauris laoreet bibendum dolor,
                  at vestibulum neque facilisis sed. Donec a eros quam. Cras
                  lobortis, nunc a dignissim maximus, leo nunc imperdiet tellus,
                  sed viverra felis elit ac arcu. Sed et sapien venenatis leo
                  ullamcorper finibus eu id lectus. Aliquam tristique pulvinar
                  vehicula.
                </p>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <div className="tab-pane" id="photos">
              <div className="restaurants-detail-bg m-bottom">
                <h4>Photos</h4>
                <p style={{ fontWeight: 500 }}>10 Photos</p>
                <div className="gallery-pf">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-1.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-2.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-3.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-4.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-5.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-6.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-7.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                      <div className="photo-gallery">
                        <img
                          src="/assets/images/restaurant-detail/photo-8.jpg"
                          alt=""
                        />
                        <a href="#">
                          <i className="far fa-plus-square" />
                        </a>
                      </div>
                    </div>
                    <div className="spinner q-bottom">
                      <div className="d-flex justify-content-center">
                        <a href="#">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    restData: state.restListReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDataWithParams: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type))
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Tab1);
