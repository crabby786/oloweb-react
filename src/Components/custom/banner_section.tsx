import React, { Component } from "react";
import * as oloApi from "../../Constants/OloApi";
import { compose } from "recompose";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { connect } from "react-redux";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { withRouter } from "react-router-dom";
import { DefaultTimePicker } from "../DateTimePicker";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  withStyles,
  MenuItem,
  Button,
} from "@material-ui/core";
import { IhomeDetails, IrestData } from "../../Models/RestListModel";
import { AlertDialog } from "../UiComps/alerts";
import { DropdownA } from "../FormComps";
import { getLocationAction } from "../../Store/Actions/helperAction";
import { imgBase } from "../../Constants/DishCoApi";
import { parse, isAfter, addMinutes, format } from "date-fns";

class BannerSection extends Component<any, any> {
  readonly restData: IrestData = this.props.restData;
  readonly homeDetail: IhomeDetails = this.restData.homeDetails
  readonly CityList = this.homeDetail.CityList
  readonly LocationList = this.homeDetail.LocationList.filter(obj=> obj.CityId ===  this.CityList[0].CityId)
  readonly RestaurantList = this.homeDetail.RestaurantList[0].RestaurantDeliveryList.filter(obj=> obj.LocationId ===  this.LocationList[0].LocationId)
  
  state = {
    location: {
      Strloclatitude: "",
      strLocLongitude: "",
    },
    formatedAdd: {CityId:null},
    pickupTime: null,
    openPicker: false,
    selectedCity: this.CityList[0].CityId,
    selectedArea: this.LocationList[0].LocationId,
    selectedRest: this.RestaurantList.length ?  this.RestaurantList[0].RestaurantId: 0,
    CityList: [...this.CityList],
    LocationList: [...this.LocationList],
    RestaurantList: [...this.RestaurantList],
    restList: { RestaurantDeliveryList: [], StatusCode: 0 },
    homeDetails: { ...this.homeDetail },
    pickStatus: "pickup",
    isLocation: false,
    query: { ...oloApi.GetRestuarantListParams },
    url: oloApi.GetRestuarantList,
    errorObj: { errorMsg: "", isError: false },
    toggle:{ formBox:false }
  };

  static getDerivedStateFromProps(props, state) {
    let restData: IrestData = props.restData
    if (restData.formatedAdd.CityId !== state.formatedAdd.CityId) {
      let cityId = restData.formatedAdd.CityId;
      let locationId = restData.formatedAdd.CityId;
      let restId = restData.formatedAdd.CityId;
      return {
        selectedCity: cityId,
        formatedAdd:{CityId:restData.formatedAdd.CityId}
      }
    }

    return null;
  }
  componentDidMount() {
    this.getLandingPageBanner();
  }
  componentDidUpdate(prevProps, prevState) {
    const homeDetails = this.restData.homeDetails
    const { LocationList, RestaurantList } = homeDetails;
    const { selectedCity, selectedArea } = this.state;
    if (prevState.selectedCity !== this.state.selectedCity) {
      let areaList = [...LocationList].filter(obj => obj.CityId === Number(selectedCity));
      let area = areaList.length ? areaList[0] : { LocationId: 0 };
      this.setState({
        LocationList: areaList,
        selectedArea: area.LocationId,
      });
    }
    if (prevState.selectedArea !== this.state.selectedArea) {
      let restList = [...RestaurantList[0].RestaurantDeliveryList].filter(obj => obj.LocationId === Number(selectedArea))
        let rest1 = restList.length ? restList[0] : {RestaurantId:0};
        this.setState({
          RestaurantList: restList,
          selectedRest: rest1.RestaurantId
        })
      
    }
    if (prevState.selectedRest !== this.state.selectedRest) {
      this.getLandingPageBanner();
      this.autoHandleDate()
    }
    // if (prevState.toggle !== this.state.toggle) {
    //   const {formBox} = this.state.toggle;
    //   if(formBox) 
    // }

  }
  alertError = (errorObj) => {
    this.setState({ errorObj: { ...errorObj } });
  };
  handleDateChange = (date, ) => {
    const { selectedRest, pickStatus } = this.state;
    let { homeDetails } = this.props.restData;
    let { StrRestaurantDeliveryMsg } = homeDetails
    let rest = homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj => obj.RestaurantId == selectedRest);
    let {
      HomeDeliveryPickTime,
      MinDeliveryTime,
      EveningDeliveryToTime,
      MorningDeliveryFromTime,
      EveningDeliveryFromTime,
      MorningDeliveryToTime,
      DeliveryFromTime,
      DeliveryToTime,
    } = rest;
    //Update pickup time
    let now = new Date()
    DeliveryToTime = DeliveryToTime.trim() === "24.00" ? "23.59" : DeliveryToTime;
    let m_startDt = parse(DeliveryFromTime.trim(), 'H.mm', now)
    let m_endDt = parse(MorningDeliveryToTime.trim(), 'H.mm', now)
    let errorMsg = "";
    let m_isEarly = isAfter(m_startDt, date)
    let m_isLate = isAfter(date, m_endDt)
    if (m_isEarly || m_isLate) {
      errorMsg = homeDetails.StrRestaurantClosedMsg.replace('{{MorningTime}}', `${MorningDeliveryFromTime} To ${MorningDeliveryToTime}`).replace('{{EveningTime}}', `${EveningDeliveryFromTime} To ${EveningDeliveryToTime}`)
      this.alertError({ isError: true, errorMsg })
    }
    else if (pickStatus == "pickup") {
      // sometimes fmtest brings empty string here
      let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length ? parseInt(HomeDeliveryPickTime) : 0;
      let availablePick = addMinutes(now, HomeDeliveryPickTime2);
      if (date < availablePick) {
        errorMsg =
          "pickup" +
          StrRestaurantDeliveryMsg.replace(
            "{{minute}}",
            HomeDeliveryPickTime
          ).replace(
            "{{time}}",
            format(availablePick, "hh:mm a")
          );
        this.alertError({ isError: true, errorMsg })
      }
      else {
        this.setState({
          ...this.state,
          pickupTime: date,
        });
      }
    }
    else if (pickStatus == "delivery") {
      let availableDel = addMinutes(now, MinDeliveryTime);
      if (date < availableDel) {
        errorMsg = StrRestaurantDeliveryMsg.replace(
          "{{minute}}",
          MinDeliveryTime
        ).replace(
          "{{time}}",
          format(availableDel, "hh:mm a")
        );
        this.alertError({ isError: true, errorMsg })
      }
      else {
        this.setState({
          ...this.state,
          pickupTime: date,
        });
      }
    }

  };
  autoHandleDate = () => {
    if (this.state.selectedRest) {
      const restObj = this.restData.homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj => obj.RestaurantId === Number(this.state.selectedRest))
      let {
        HomeDeliveryPickTime,
        MinDeliveryTime,
        EveningDeliveryToTime,
        MorningDeliveryFromTime,
        EveningDeliveryFromTime,
        MorningDeliveryToTime,
        DeliveryFromTime,
        DeliveryToTime,
      } = restObj;
      //Update pickup time
      let now = new Date()
      DeliveryToTime = DeliveryToTime.trim() === "24.00" ? "23.59" : DeliveryToTime;
      let m_startDt = parse(DeliveryFromTime.trim(), 'H.mm', now)
      let m_endDt = parse(DeliveryToTime.trim(), 'H.mm', now)
      if (this.state.pickStatus == "pickup") {
        let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length ? Number(HomeDeliveryPickTime) : 0;
        let availablePick = addMinutes(now, HomeDeliveryPickTime2)

        let m_isEarly = isAfter(m_startDt, availablePick)
        let m_isLate = isAfter(availablePick, m_endDt)

        if (m_isEarly || m_isLate) { this.setState({ pickupTime: null, }) }
        else { this.setState({ pickupTime: availablePick, }); }
      }
      else if (this.state.pickStatus == "delivery") {
        let availableDel = addMinutes(now, MinDeliveryTime);

        let m_isEarly = isAfter(m_startDt, availableDel)
        let m_isLate = isAfter(availableDel, m_endDt)

        if (m_isEarly ||  m_isLate ) { this.setState({ pickupTime: null, }) }
        else { this.setState({ pickupTime: availableDel, }); }
      }
    }
  }
  getMenuList = (e) => {
    e.preventDefault();

    const { selectedRest, pickupTime } = this.state;
     if (selectedRest === 0) {
      let errorObj = {
        errorMsg: "Please Select the Restaurant",
        isError: true,
      };
      this.alertError(errorObj);
      return;
    } else if (pickupTime === null) {
      let errorObj = {
        errorMsg: "Please Select the Pickup Time",
        isError: true,
      };
      this.alertError(errorObj);
      return;
    } else {
      let HomeDetails: IhomeDetails = this.props.restData.homeDetails;
      let restObj = HomeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj => obj.RestaurantId === Number(selectedRest));
      let selectObj = {
        restId: this.state.selectedRest,
        cityId: this.state.selectedCity,
        areaId: this.state.selectedArea,
        pickStatus: this.state.pickStatus,
        pickupTime: this.state.pickupTime,
      }
      this.props.setSelection({ restObj, selectObj })

      this.props.history.push({
        pathname: "/restdetail/" + this.state.selectedRest,
        state: {
          restId: this.state.selectedRest,
          pickStatus: this.state.pickStatus,
          pickupTime: this.state.pickupTime,
        },
      });
    }
  };
  handlePickupDelivery = (e) => {
    let pickStatus = e.target.value;
    this.setState({
      ...this.state,
      pickStatus,
    });
  };
  handleChangeRest = (event) => {
    let { value, name } = event.target,
      nVal = Number(value)
    this.setState({ [name]: nVal });
  };
  getLandingPageBanner() {
    const { getLandingPageBannerParams, getLandingPageBanner } = oloApi;
    let params = { ...getLandingPageBannerParams };
    if (this.state.selectedCity) {
      params.IntLocCityId = Number(this.state.selectedCity)
      params.IntLocRestaurantId = this.state.selectedRest ? Number(this.state.selectedRest) : 0
      this.props.getDataWithParams(params, getLandingPageBanner, 'landingPageBanner', { minLoading: true });
    }
  }

  render() {
    const { classes, restData } = this.props;
    const { CityList, LocationList, RestaurantList } = this.state;
    const homeDetails: IhomeDetails = restData.homeDetails;

    return (
      <section className="block-preview">
        <div
          className="cover-banner"
          style={{
            backgroundImage: `url(${
              imgBase + homeDetails.StrRestaurantBackImage
              }.jpg)`,
          }}
        ></div>
        <div className="container banner-contiainer">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="logo-container ">
                  <img
                    className="pc-logo img-fluid "
                    src={imgBase + homeDetails.StrRestaurantLogo + ".jpg"}
                    // src={six_degree}
                    alt="logo"
                  />
                </div>
              <div className="left-text-b">
                {/* <h1 className="title">{homeDetails.StrAccountDisplayMsg}</h1> */}
                <h1 className="title">Pick Restaurant, Order and Checkout</h1>
                <h6 className="exeption">Select the Restaurant that matches your needs</h6>
                {/* <p className="safety-txt"> {homeDetails.StrDisplayText} </p> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <form>
                <div className={ this.state.toggle.formBox ? "form-container2 flip" : "form-container2"}>
                  <div className="form-box" >
                  <div className="front" >
                  <div className="left-text">
                  <div>
                    
                  {/* <h1 className="title"> Delicious food awaits you </h1> */}
                  </div>
                {/* <h1 className="title">{homeDetails.StrAccountDisplayMsg}</h1> */}
                {/* <p className="safety-txt"> {homeDetails.StrDisplayText} </p> */}
               
              </div>
                  </div>

                  <div className="back" >
                  
                  <DropdownA
                    value={this.state.selectedCity}
                    handleChange={this.handleChangeRest}
                    name="selectedCity"
                    label="City"
                  >
                    {CityList.length && CityList.map((obj, i) => (
                      <MenuItem key={i} value={obj.CityId}>
                        {obj.CityName}
                      </MenuItem>
                    ))}
                  </DropdownA>
                  <DropdownA
                    value={this.state.selectedArea}
                    handleChange={this.handleChangeRest}
                    name="selectedArea"
                    label="Area"
                    disabled={false}
                  >
                    {LocationList && LocationList.map((obj, i) =>
                      <MenuItem key={i} value={obj.LocationId}>
                        {obj.LocationName}
                      </MenuItem>)
                    }
                  </DropdownA>
                  <DropdownA
                    value={this.state.selectedRest}
                    handleChange={this.handleChangeRest}
                    name="selectedRest"
                    label="Restaurant"
                    disabled={false}
                  >
                    {RestaurantList.length ? RestaurantList.map(
                      (obj, i) =>
                        <MenuItem key={i} value={obj.RestaurantId}>
                          {obj.RestaurantName}
                        </MenuItem>
                        )
                        :
                        <MenuItem  value={0}>
                          Select Restaurant
                        </MenuItem>
                      }
                  </DropdownA>
                  
                  <div className="pickup-time">
                    <DefaultTimePicker
                      id="time-picker"
                      label={this.state.pickStatus === "pickup" ? "Pickup Time" : "Delivery time"}
                      value={this.state.pickupTime}
                      open={this.state.openPicker}
                      onChange={this.handleDateChange}
                      onClose={() => this.setState({ openPicker: false })}

                    />
                    <Button
                      variant="outlined"
                      fullWidth
                      disableRipple
                      disabled={this.state.selectedRest === 0}
                      onClick={() => this.setState({ openPicker: true })}
                    >
                      {" "}
                      {this.state.pickupTime === null
                        ? ( this.state.pickStatus === "pickup" ? "Pickup Time" : "Delivery Time")
                        : format(
                          this.state.pickupTime,
                          "h:mm a"
                        ).toString()}{" "}
                    </Button>
                  </div>

                  <div className="radios ">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={this.state.pickStatus}
                      defaultValue="pickup"
                    >
                      <FormControlLabel
                        value="pickup"
                        control={<Radio color="primary" />}
                        label="pickup"
                        labelPlacement="end"
                        onChange={this.handlePickupDelivery}
                        className={classes.pickupRadios}
                      />
                      <FormControlLabel
                        value="delivery"
                        control={<Radio color="primary" />}
                        label="delivery"
                        labelPlacement="end"
                        onChange={this.handlePickupDelivery}
                        className={classes.pickupRadios}
                      />
                    </RadioGroup>
                  </div>
                  <Button variant="contained" size="large" fullWidth color="primary" onClick={this.getMenuList} className="mt-3">
                    Place Order
                  </Button>
                  </div>
                  
                  </div>
                </div>
              </form>
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
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(ownProps);
  // console.log(state);
  return {
    restData: state.restListReducer,
    userData: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, other)),
    getLocation: () => dispatch(getLocationAction()),
    setSelection: (params) => dispatch({ type: 'set_restdetail', payload: params }),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(BannerSection);
