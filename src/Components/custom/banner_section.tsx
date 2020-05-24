import React, { Component } from "react";
import * as oloApi from "../../Constants/OloApi";
import { compose } from "recompose";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { connect } from "react-redux";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { withRouter } from "react-router-dom";
import six_degree from "../../img/six_degree.png";
import { DefaultTimePicker } from "../DateTimePicker";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  withStyles,
  MenuItem,
  Button,
} from "@material-ui/core";
import { IhomeDetails } from "../../Models/RestListModel";
import { AlertDialog } from "../UiComps/alerts";
import { DropdownA } from "../FormComps";
import { getLocationAction } from "../../Store/Actions/helperAction";
import { GetFormatedAddress } from "../../Constants/OloApi";
import { imgBase } from "../../Constants/DishCoApi";
import { parse, isAfter,addMinutes,format } from "date-fns";

class BannerSection extends Component<any, any> {
  state = {
    location: {
      Strloclatitude: "",
      strLocLongitude: "",
    },
    formatedAdd: {},
    pickupTime: null,
    openPicker: false,
    selectedCity: "",
    selectedArea: "",
    selectedRest: "",
    allCities: [],
    AllLocations: [],
    restList: { RestaurantDeliveryList: [], StatusCode: 0 },
    pickStatus: "pickup",
    isLocation: false,
    query: { ...oloApi.GetRestuarantListParams },
    url: oloApi.GetRestuarantList,
    errorObj: { errorMsg: "", isError: false },
  };

  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    // if( restData.formatedAdd.CityId && restData.formatedAdd.CityId != state.selectedCity )
    // {
    //   let cityId = restData.formatedAdd.CityId;
    //   let area = restData.homeDetails.LocationList.find(obj=> obj.CityId == cityId );
    //   let areaId = area.LocationId;
    //   return { 
    //     selectedCity:cityId,
    //     selectedArea:areaId
    //    }
    // }

    return null;
  }
  

  alertError = (errorObj) => {
    this.setState({ errorObj: { ...errorObj } });
  };
  handleDateChange = (date) => {
    const { selectedRest,  pickStatus} = this.state;
    let {homeDetails} = this.props.restData;
    let {StrRestaurantDeliveryMsg} = homeDetails
    let rest = homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj=> obj.RestaurantId == selectedRest );
    let {HomeDeliveryPickTime,MinDeliveryTime,OpeningTime,ClosingTime} = rest;

    let now = new Date()
    let startDt = parse(OpeningTime.trim(), 'h:mm a', now)
    let endDt = parse(ClosingTime.trim(), 'h:mm a', now)
    let errorMsg = "";
    let isLate =  isAfter(date,endDt)
    let isEarly =  isAfter(startDt,date)


  if(isLate || isEarly) {
         errorMsg = homeDetails.StrRestaurantClosedMsg.replace('{{MorningTime}}',OpeningTime).replace('{{EveningTime}}',ClosingTime)
        this.alertError({isError:true, errorMsg})
      }
   else if (pickStatus == "pickup") {
     // sometimes fmtest brings empty string here
    let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length ?  parseInt(HomeDeliveryPickTime) : 0;
    let availablePick = addMinutes(date, HomeDeliveryPickTime2);
     if (date <= availablePick) {
          errorMsg =
          "pickup" +
          StrRestaurantDeliveryMsg.replace(
            "{{minute}}",
            HomeDeliveryPickTime
          ).replace(
            "{{time}}",
            format(availablePick, "hh:mm")
          );
          this.alertError({isError:true, errorMsg})
        }  
    } 
    else if (pickStatus == "delivery") {
      let availableDel = addMinutes(date, MinDeliveryTime);
      if (date <= availableDel) {
        errorMsg = StrRestaurantDeliveryMsg.replace(
          "{{minute}}",
          MinDeliveryTime
        ).replace(
          "{{time}}",
          format(availableDel, "hh:mm")
        );
        this.alertError({isError:true, errorMsg})
      } 
    }
      else {
        this.setState({
          ...this.state,
          pickupTime: date,
        });
      }
  };
  getMenuList = (e) => {
    e.preventDefault();

    const { selectedCity, selectedArea, selectedRest, pickupTime } = this.state;
    if (selectedCity === "") {
      let errorObj = { errorMsg: "Please Select the City", isError: true };
      this.alertError(errorObj);
      return;
    } else if (selectedArea === "") {
      let errorObj = { errorMsg: "Please Select the Area", isError: true };
      this.alertError(errorObj);
      return;
    } else if (selectedRest === "") {
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
      let HomeDetails:IhomeDetails = this.props.restData.homeDetails;
      let restObj = HomeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj=> obj.RestaurantId === Number(selectedRest) );
      let selectObj = {
        restId: this.state.selectedRest,
        cityId: this.state.selectedCity,
        areaId: this.state.selectedArea,
          pickStatus: this.state.pickStatus,
          pickupTime: this.state.pickupTime,
      }
      this.props.setSelection({restObj,selectObj})
      
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
  handlePickupDelivery = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickStatus = e.target.value;
    this.setState({
      ...this.state,
      pickStatus,
    });
  };
  handleChangeRest = (event) => {
    let { value, name } = event.target,
     {selectedCity, selectedArea,pickStatus} = this.state,
    nVal = parseInt(value),
    HomeDetails:IhomeDetails = this.props.restData.homeDetails,
    restObj = HomeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj=>obj.RestaurantId == nVal && obj.LocationId == Number(selectedArea) )
    this.setState({ [name]: nVal, restObj });
    let {HomeDeliveryPickTime,MinDeliveryTime,OpeningTime,ClosingTime} = restObj;

    let now = new Date()
    let startDt = parse(OpeningTime.trim(), 'h:mm a', now)
    let endDt = parse(ClosingTime.trim(), 'h:mm a', now)
    if (pickStatus == "pickup") {
      let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length ?  parseInt(HomeDeliveryPickTime) : 0;
      let availablePick = addMinutes(now,HomeDeliveryPickTime2)
      let isLate =  isAfter(availablePick,endDt)
      let isEarly =  isAfter(startDt,availablePick)
      if(isLate || isEarly || (!availablePick )  ) { return }
      else { this.setState({pickupTime: availablePick, }); }
    }
    else if (pickStatus == "delivery") {
      let availableDel = addMinutes(now, MinDeliveryTime);
      let isLate =  isAfter(availableDel,endDt)
      let isEarly =  isAfter(startDt,availableDel)
      if(isLate || isEarly || (!availableDel ) ) { return }
      else { this.setState({pickupTime: availableDel, }); }
    }
    
  };
  handleChangeCity = (e) => {
    let { value, name } = e.target,
    nVal = parseInt(value),
    HomeDetails:IhomeDetails = this.props.restData.homeDetails,
    area = HomeDetails.LocationList.find(obj=> obj.CityId == nVal )
    this.setState({[name]: nVal,selectedArea:area.LocationId });
  };
  handleChangeLocation = (event) => {
    let { name, value } = event.target,
    nVal = Number(value);
    this.setState({ [name]: nVal,  });
  };
  render() {
    const { classes, restData } = this.props;
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
                <h1 className="title">{homeDetails.StrAccountDisplayMsg}</h1>
                {/* <h6 className="exeption"></h6> */}
                <p className="safety-txt"> {homeDetails.StrDisplayText} </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <form>
                <div className="form-box">
                  <DropdownA
                    value={this.state.selectedCity}
                    handleChange={this.handleChangeCity}
                    name="selectedCity"
                    label="City"
                  >
                    {homeDetails.CityList.map((obj, i) => (
                      <MenuItem key={i} value={obj.CityId}>
                        {obj.CityName}
                      </MenuItem>
                    ))}
                  </DropdownA>
                  <DropdownA
                    value={this.state.selectedArea}
                    handleChange={this.handleChangeLocation}
                    name="selectedArea"
                    label="Area"
                    disabled={false}
                  >
                    {homeDetails.LocationList.map((obj, i) => {
                      return Number(this.state.selectedCity) === obj.CityId ? (
                        <MenuItem key={i}  value={obj.LocationId}>
                          {obj.LocationName}
                        </MenuItem>
                      ) : null;
                    })}
                  </DropdownA>
                  <DropdownA
                    value={this.state.selectedRest}
                    handleChange={this.handleChangeRest}
                    name="selectedRest"
                    label="Restaurant"
                    disabled={false}
                  >
                    { homeDetails.RestaurantList[0].RestaurantDeliveryList.map(
                      (obj, i) => {
                        return obj.LocationId === Number(this.state.selectedArea) ? (
                          <MenuItem key={i}  value={obj.RestaurantId}>
                            {" "}
                            {obj.RestaurantName}{" "}
                          </MenuItem>
                        ) : null
                      }
                    )}
                  </DropdownA>
                  <div className="pickup-time">
                    <DefaultTimePicker
                      id="time-picker"
                      label="Pickup Time"
                      value={this.state.pickupTime}
                      open={this.state.openPicker}
                      onChange={this.handleDateChange}
                      onClose={() => this.setState({ openPicker: false })}
                      
                    />
                    <Button
                      variant="outlined"
                      fullWidth
                      disableRipple
                      disabled = {this.state.selectedRest == ""}
                      onClick={() => this.setState({ openPicker: true })}
                    >
                      {" "}
                      {this.state.pickupTime === null
                        ? "Pickup Time"
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
                  <button className="search-btn" onClick={this.getMenuList}>
                    Place Order
                  </button>
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
    getLocation: () => dispatch(getLocationAction()),
    setSelection: (params) => dispatch({ type:'set_restdetail', payload:params }),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(BannerSection);
