import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  withStyles,
} from "@material-ui/core/styles";
import { filterListAction, changeLocationAction } from "../Store/Actions/restListAction";
import { homeStyle } from "../Styles/jss/homePageStyles";
import * as oloApi from "../Constants/OloApi";

class RestaurantList extends Component<any, any> {
  static getDerivedStateFromProps(props, state) {
    // let {pickStatus , location} = props.location.state;
    // if(pickStatus != state.pickStatus ||  location != state.location){
     let location = {
      Strloclatitude:"19.109528",strLocLongitude:"73.01802"
    }
     props.changeLocation(location,state.url)
      props.getRestList(location, state.url)
      return {
        ...state,
        location
      }
    
    // return null;
  }
  state = {
    isDialogeOpen: false,
    sortByRankDistance: "distance",
    sortByLocalTourist: "local",
    initialList: [],
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
    query :{...oloApi.GetRestuarantListParams},
    url: oloApi.GetRestuarantList,
    totalRestCount: 0,
    expanded:"",
    pickStatus:"",
    location: {
      Strloclatitude:"",strLocLongitude:""
    },
  };
 
  toggleMoreInfo = (panel: string) => {
    let isExpanded = this.state.expanded
    this.setState({
      ...this.state,
      expanded : isExpanded && isExpanded === panel ? "" : panel  
    });
  };

  handleOpenDialoge = () => {
    this.setState({
      ...this.state,
      isDialogeOpen: true,
    });
  };
  closeDialoge = () => {
    this.setState({
      ...this.state,
      isDialogeOpen: false,
    });
  };
  handleChangeFilterList = (event, value: string, useFunction?: boolean) => {
    //if event.currentTarget.name cannot get use useFunction
    let radioName = useFunction ? event : event.currentTarget.name;

    this.setState((prev) => {
      prev = { ...prev, [radioName]: value };
      switch (prev.sortByLocalTourist) {
        case "local":
          prev.listUrl = `RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter`;
          if (prev.sortByRankDistance === "rank") {
            prev.queryParams = { ...prev.queryParams, IntLocOrderby: 1 };
          } else {
            prev.queryParams = { ...prev.queryParams, IntLocOrderby: 2 };
          }
          break;
        case "tourist":
          prev.listUrl = `AllTouristDishesRankWiseFilter/GetFunPubAllTouristDishesRankWiseFilter`;
          if (prev.sortByRankDistance === "rank") {
            prev.queryParams = { ...prev.queryParams, IntLocOrderby: 1 };
          } else {
            prev.queryParams = { ...prev.queryParams, IntLocOrderby: 2 };
          }
          break;

        default:
          prev.listUrl = `RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter`;
          break;
      }
      // filterList(prev.queryParams, prev.listUrl)
      // prev.initialList = [prop.restData.data.AllRestaurantDishes ]
      return { ...prev };
    });
  };

  removeFilter = (key: string, value: string) => {
    this.handleChangeFilterList(key, value, true);
  };
  
  render() {
    const { restData } = this.props;

    return (
      <div>
        {restData.isError ? (
          <div>{restData.errorMsg}</div>
        ) : (
          <div>restlist</div>
          // <section className="all-partners">
          //   <div className="container">
          //     <div className="row">
          //       {/* pc filter */}
          //       <div className="col-lg-3 col-md-4 d-none d-md-block md-filter-container">
          //         <div className="filters partner-bottom">
          //           <div className="filter-heading">
          //             <h3>Filters</h3>
          //           </div>
          //           <div className="accordion" id="accordionone">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseOne"
          //                 aria-expanded="true"
          //                 aria-controls="collapseOne"
          //               >
          //                 Location
          //               </button>
          //               <div
          //                 id="collapseOne"
          //                 className="collapse show"
          //                 data-parent="#accordionone"
          //                 style={{}}
          //               >
          //                 <div className="search-area">
          //                   <form>
          //                     <input
          //                       className="search-area-input"
          //                       name="search"
          //                       type="text"
          //                       placeholder="Search your area"
          //                     />
          //                     <div className="icon-btn">
          //                       <div className="cross-area-icon">
          //                         <i className="fas fa-crosshairs" />
          //                       </div>
          //                     </div>
          //                   </form>
          //                 </div>
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c1" name="cb" />
          //                     <label htmlFor="c1">All</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c2" name="cb" />
          //                     <label htmlFor="c2">Canterbury-Bankstown</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c3" name="cb" />
          //                     <label htmlFor="c3">
          //                       Central Business District
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c4" name="cb" />
          //                     <label htmlFor="c4">Eastern Suburbs</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c5" name="cb" />
          //                     <label htmlFor="c5">Forest District</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c6" name="cb" />
          //                     <label htmlFor="c6">Greater Western Sydney</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c7" name="cb" />
          //                     <label htmlFor="c7">Hills District</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c8" name="cb" />
          //                     <label htmlFor="c8">Inner West</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c9" name="cb" />
          //                     <label htmlFor="c9"> Macarthur</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c10" name="cb" />
          //                     <label htmlFor="c10">Central Business</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c11" name="cb" />
          //                     <label htmlFor="c11">Main Market</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c12" name="cb" />
          //                     <label htmlFor="c12">Eastern</label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //           <div className="accordion" id="accordiontwo">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown collapsed"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseTwo"
          //                 aria-expanded="false"
          //                 aria-controls="collapseTwo"
          //               >
          //                 Categories
          //               </button>
          //               <div
          //                 id="collapseTwo"
          //                 className="collapse"
          //                 data-parent="#accordiontwo"
          //                 style={{}}
          //               >
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c13" name="cb" />
          //                     <label htmlFor="c13"> Breakfast</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c14" name="cb" />
          //                     <label htmlFor="c14">Lunch</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c15" name="cb" />
          //                     <label htmlFor="c15"> Dinner</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c16" name="cb" />
          //                     <label htmlFor="c16">Cafe's</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c17" name="cb" />
          //                     <label htmlFor="c17">Delivery</label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //           <div className="accordion" id="accordionthree">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseThree"
          //                 aria-expanded="false"
          //                 aria-controls="collapseThree"
          //               >
          //                 Cuisine
          //               </button>
          //               <div
          //                 id="collapseThree"
          //                 className="collapse"
          //                 data-parent="#accordionthree"
          //               >
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c18" name="cb" />
          //                     <label htmlFor="c18">Pizza</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c19" name="cb" />
          //                     <label htmlFor="c19">
          //                       Drinks &amp; Beer Restaurants
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c20" name="cb" />
          //                     <label htmlFor="c20">Cakes &amp; Desserts</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c21" name="cb" />
          //                     <label htmlFor="c21">Sushi</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c22" name="cb" />
          //                     <label htmlFor="c22">Fast Food</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c23" name="cb" />
          //                     <label htmlFor="c23">Shawarma</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c24" name="cb" />
          //                     <label htmlFor="c24">Fish</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c25" name="cb" />
          //                     <label htmlFor="c25">Lunch</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c26" name="cb" />
          //                     <label htmlFor="c26">Coffee Cafe’s</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c27" name="cb" />
          //                     <label htmlFor="c27">Cheese Tika</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c28" name="cb" />
          //                     <label htmlFor="c28">Samosa and Pakodas</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c29" name="cb" />
          //                     <label htmlFor="c29">Chinese</label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //           <div className="accordion" id="accordionfour">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseFour"
          //                 aria-expanded="false"
          //                 aria-controls="collapseFour"
          //               >
          //                 Establish Type
          //               </button>
          //               <div
          //                 id="collapseFour"
          //                 className="collapse"
          //                 data-parent="#accordionfour"
          //               >
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c30" name="cb" />
          //                     <label htmlFor="c30">Cafe’s</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c31" name="cb" />
          //                     <label htmlFor="c31">Dhaba’s</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c32" name="cb" />
          //                     <label htmlFor="c32">Sweet Shopst</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c33" name="cb" />
          //                     <label htmlFor="c33">Fine Dinings</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c34" name="cb" />
          //                     <label htmlFor="c34">Casual Dinings</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c35" name="cb" />
          //                     <label htmlFor="c35">Bakeries</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c36" name="cb" />
          //                     <label htmlFor="c36">Bars</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c37" name="cb" />
          //                     <label htmlFor="c37">Vine Shops</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c38" name="cb" />
          //                     <label htmlFor="c38">Halls</label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //           <div className="accordion" id="accordionfive">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseFive"
          //                 aria-expanded="false"
          //                 aria-controls="collapseFive"
          //               >
          //                 Restaurants offers
          //               </button>
          //               <div
          //                 id="collapseFive"
          //                 className="collapse"
          //                 data-parent="#accordionfive"
          //               >
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c39" name="cb" />
          //                     <label htmlFor="c39">10% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c40" name="cb" />
          //                     <label htmlFor="c40">20% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c41" name="cb" />
          //                     <label htmlFor="c41">30% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c42" name="cb" />
          //                     <label htmlFor="c42">40% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c43" name="cb" />
          //                     <label htmlFor="c43">50% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c44" name="cb" />
          //                     <label htmlFor="c44">60% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c45" name="cb" />
          //                     <label htmlFor="c45">70% off</label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c46" name="cb" />
          //                     <label htmlFor="c46">80% off</label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //           <div className="accordion" id="accordionsix">
          //             <div className="location">
          //               <button
          //                 className="filter-dropdown"
          //                 type="button"
          //                 data-toggle="collapse"
          //                 data-target="#collapseSix"
          //                 aria-expanded="false"
          //                 aria-controls="collapseSix"
          //               >
          //                 Rating
          //               </button>
          //               <div
          //                 id="collapseSix"
          //                 className="collapse"
          //                 data-parent="#accordionsix"
          //               >
          //                 <div className="filter-checkbox">
          //                   <p>
          //                     <input type="checkbox" id="c47" name="cb" />
          //                     <label htmlFor="c47" className="rating-color">
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c48" name="cb" />
          //                     <label htmlFor="c48" className="rating-color">
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c49" name="cb" />
          //                     <label htmlFor="c49" className="rating-color">
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c50" name="cb" />
          //                     <label htmlFor="c50" className="rating-color">
          //                       <i className="fas fa-star" />
          //                       <i className="fas fa-star" />
          //                     </label>
          //                   </p>
          //                   <p>
          //                     <input type="checkbox" id="c51" name="cb" />
          //                     <label htmlFor="c51" className="rating-color">
          //                       <i className="fas fa-star" />
          //                     </label>
          //                   </p>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //       {/* mobile filter */}
          //       <div className="filter-container col-12 d-md-none">
          //         <div className={classes.searchControl}>
          //           <div className={classes.searchIcon}>
          //             <Icon children="search" />
          //           </div>
          //           <InputBase
          //             placeholder="Search…"
          //             classes={{
          //               root: classes.inputRoot,
          //               input: classes.inputInput,
          //             }}
          //             inputProps={{ "aria-label": "search" }}
          //           />
          //         </div>
          //         <div className="hr-list">
          //           <Button
          //             variant="outlined"
          //             onClick={this.handleOpenDialoge}
          //             size="small"
          //             disableRipple
          //             endIcon={
          //               <span className="btn-badge">
          //                 {this.state.filterApplied}
          //               </span>
          //             }
          //             color="primary"
          //             style={{ marginLeft: 0 }}
          //           >
          //             {" "}
          //             Filter
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled={this.state.sortByRankDistance == "distance"}
          //             endIcon={
          //               this.state.sortByRankDistance == "rank" && (
          //                 <Icon
          //                   onClick={(e) =>
          //                     this.removeFilter(
          //                       "sortByRankDistance",
          //                       "distance"
          //                     )
          //                   }
          //                 >
          //                   close
          //                 </Icon>
          //               )
          //             }
          //           >
          //             {" "}
          //             Rank
          //           </Button>
          //           <Button
          //             disabled={this.state.sortByLocalTourist == "local"}
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             endIcon={
          //               this.state.sortByLocalTourist == "tourist" && (
          //                 <Icon
          //                   onClick={(e) =>
          //                     this.removeFilter("sortByLocalTourist", "local")
          //                   }
          //                 >
          //                   close
          //                 </Icon>
          //               )
          //             }
          //           >
          //             {" "}
          //             Tourist
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled
          //             endIcon={<Icon>close</Icon>}
          //           >
          //             {" "}
          //             Filter
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled
          //             endIcon={<Icon>close</Icon>}
          //           >
          //             {" "}
          //             Rank
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled
          //             endIcon={<Icon>close</Icon>}
          //           >
          //             {" "}
          //             Distance
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled
          //             endIcon={<Icon>close</Icon>}
          //           >
          //             {" "}
          //             Local
          //           </Button>
          //           <Button
          //             variant="outlined"
          //             size="small"
          //             disableRipple
          //             disabled
          //             endIcon={<Icon>close</Icon>}
          //           >
          //             {" "}
          //             Tourist
          //           </Button>
          //         </div>
          //         <div></div>
          //       </div>

          //       {/* rest list */}
          //       <div className="col-lg-9 col-md-8 col-12 px-0 px-sm-3 px-md-4">
          //         {restData.data.StatusCode > 0 ? (
          //           <div className="partner-section">
          //             <div className="partner-bar">
          //               <div className="partner-topbar">
          //                 <div className="partner-dt">
          //                   <div className="partner-name">
          //                     <a href="restaurant_detail.html">
          //                       <h4>{restData.data.Status} </h4>
          //                     </a>
          //                   </div>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         ) : (
          //           this.props.restData.data.RestaurantDeliveryList.map(
          //             (obj: RestaurantDeliveryList, i) => (
          //               <div key={i} className="partner-section">
          //                 <div className="partner-bar">
          //                   <div className="partner-topbar">
          //                     <div className="partner-dt">
          //                       <a href="restaurant_detail.html">
          //                         <img src={imgBase + obj.RestaurantLogo} alt="" />
          //                       </a>
          //                       <div className="partner-name">
          //                         <a href="restaurant_detail.html">
          //                           <h4>{obj.RestaurantName} </h4>
          //                         </a>
          //                         <div className="country">
          //                           {obj.City}
          //                         </div>
          //                         <p>
          //                           <span>
          //                             <i className="fas fa-map-marker-alt" />
          //                           </span>
          //                           {obj.Location == "" ? 'N.A' : obj.Location }
          //                         </p>
                                  
          //                       </div>
          //                       <div className="online-offline">
          //                         {obj.IsDeliver == 1 ? <p>
          //                            <span className="span-1 active">
          //                             <i className="fas fa-circle" />
          //                          </span> <span className="d-none d-md-inline">online</span> </p> 
          //                          :
          //                         <p>
          //                         <span className="span-1 ">
          //                          <i className="fas fa-circle" /> </span> <span className="d-none d-md-inline">offline </span></p>  }

          //                          <Button 
          //                             disableRipple
          //                             classes = {{label:classes.moreLbl}}
          //                            onClick= {()=> this.toggleMoreInfo(`panel${i}`)} size="small" color="primary"
          //                            endIcon = {<i className= {clsx("fas ", this.state.expanded == `panel${i}`? "fa-chevron-up":"fa-chevron-down")}></i>}
          //                            > <span className="txt"> view more </span>
          //                           </Button >
                                  
          //                       </div>
          //                     </div>
                              
                                   
          //                   </div>
          //                   <Collapse in = {this.state.expanded == `panel${i}`}>
          //                   <div className={clsx("partner-subbar")}>
          //                     <div className="detail-text">
          //                       <ul>
          //                         <li>
          //                           Morning time :{`${obj.MorningDeliveryFromTime} to ${obj.MorningDeliveryToTime} `}
          //                         </li>
          //                         <li>
          //                           Evening time :{`${obj.EveningDeliveryFromTime} to ${obj.EveningDeliveryToTime} `}
          //                         </li>
          //                         <li>Cuisines : {obj.Cuisines}</li>
          //                         <li>
          //                           Min : {obj.MinOrder} &nbsp;
          //                           &#8377;
          //                           &nbsp; &nbsp;
          //                           <i className="far fa-clock" />
          //                           {` ${(parseInt(obj.MinTime) / 60).toFixed(0)} Min`}
          //                           &nbsp;
          //                           <span>
          //                         <i className="fas fa-map-marker-alt" />
          //                         {(parseFloat(obj.Distance) / 1000).toFixed(2) + " Km"}
          //                       </span>
          //                         </li>
                                  
          //                       </ul>
          //                     </div>
          //                   </div>
          //                   </Collapse>
          //                   <div className="partner-bottombar">
          //                     <ul className="bottom-partner-links">
                                
          //                       <li className="line-lr">
          //                         <Link
          //                           to={"/restdetail/" + obj.RestaurantId + obj.AccountId + obj.GroupId}
          //                           data-toggle="tooltip"
          //                           data-placement="top"
          //                           title="Order Now"
          //                         >
          //                           <i className="fas fa-shopping-cart" />
          //                           Order Now
          //                         </Link>
          //                       </li>
          //                       <li>
          //                         <a
          //                           href="#"
          //                           data-toggle="tooltip"
          //                           data-placement="top"
          //                           title="View Menu"
          //                         >
          //                           <i className="fas fa-book" />
          //                           View Menu
          //                         </a>
          //                       </li>
          //                     </ul>
          //                   </div>
          //                 </div>
          //               </div>
          //             )
          //           )
          //         )}
          //         <div className="main-p-pagination">
          //           <nav aria-label="Page navigation example">
          //             <ul className="pagination">
          //               <li className="page-item">
          //                 <a
          //                   className="page-link"
          //                   href="#"
          //                   aria-label="Previous"
          //                 >
          //                   <i className="fas fa-chevron-left" />
          //                 </a>
          //               </li>
          //               <li className="page-item">
          //                 <a className="page-link active" href="#">
          //                   1
          //                 </a>
          //               </li>
          //               <li className="page-item">
          //                 <a className="page-link" href="#">
          //                   2
          //                 </a>
          //               </li>
          //               <li className="page-item">
          //                 <a className="page-link" href="#">
          //                   ...
          //                 </a>
          //               </li>
          //               <li className="page-item">
          //                 <a className="page-link" href="#">
          //                   24
          //                 </a>
          //               </li>
          //               <li className="page-item">
          //                 <a className="page-link" href="#" aria-label="Next">
          //                   <i className="fas fa-chevron-right" />
          //                 </a>
          //               </li>
          //             </ul>
          //           </nav>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </section>
        
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestList: (queryParams, url) =>
      dispatch(filterListAction(queryParams, url)),
      changeLocation: (loc, url) =>
      dispatch(changeLocationAction(loc, url)),
  };
};
const mapStateToProps = (state) => {
  // console.log(ownProps);
  // console.log(state);
  return {
    restData: state.restListReducer,
  };
};

export default compose<any, any>(
  withRouter,
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(RestaurantList);
