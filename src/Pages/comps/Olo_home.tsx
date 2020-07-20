import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import BannerSection from '../../Components/custom/banner_section'
import FooterSection from '../../Components/custom/footer'
import TopNav from '../../Components/appbar'
import { homeStyle } from '../../Styles/jss/homePageStyles';
import {  BrowsePlaces, PopularRests, FeaturedRests, FavRecipe } from "./Home_comps";
import { LinearProgress } from '@material-ui/core';
import { IrestData } from '../../Models/RestListModel';
import { getDataWithTypeAction } from '../../Store/Actions/restListAction';
import * as oloApi from "../../Constants/OloApi";
import {d_homeDetails} from "../../Constants/dummy";
import {sortByLocal_Distance_q,sortByLocal_Distance_Api} from "../../Constants/DishCoApi";
import { FormDialog } from '../../Components/UiComps/alerts';


class OloHome extends Component<any, any> {
    readonly restData:IrestData = this.props.restData;
    static getDerivedStateFromProps(props, state) {
        if(state.ImageAdvertisement !== props.restData.landingPageBanner.ImageAdvertisement) {
            return {
                ImageAdvertisement : props.restData.landingPageBanner.ImageAdvertisement
            }
        }
        return null
    }
    state = {
        ImageAdvertisement:[...this.restData.landingPageBanner.ImageAdvertisement],
        orderStatusParams: {StrBillNo:'',StrMobileOTP:0},
        navIndex:null,
        isLoading: {order:false,restList:true, homeDetails:true}
        
    }
    handleNav = (val) => { 
        this.setState({navIndex:val})
    }
    
    
    getOrderStatus = ({billNo, pin}) => {
        this.setState({isLoading: {...this.state.isLoading,order:true}})
        const {orderStatusParams, orderStatus} = oloApi;
        let url = orderStatus
        let params = {...orderStatusParams}
        params.StrBillNo = billNo.current.value;
        params.StrMobileOTP = Number(pin.current.value);
        this.props.getDataWithParams(params, url, 'orderStatus', {})
        .then(obj => {
            const {orderStatus} = obj.payload 
            if(orderStatus.length) {
                this.setState({isLoading: {...this.state.isLoading,order:false},navIndex:null});
                this.props.history.push('/order_status')
            }
        } )
    }
    showMeals = (selectedRest, e?) => {
        e.preventDefault() ;
        let HomeDetails = this.props.restData.homeDetails;
          let restObj = HomeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj => obj.RestaurantId === Number(selectedRest));
          let selectObj = {
            restId: selectedRest,
            cityId: 1,
            areaId: 6,
            pickStatus: 'delivery',
            pickupTime: new Date(),
          }
          this.props.dispatchSetData({ 
            selectObj, restObj
          })
    
          this.props.history.push({
            pathname: "/restdetail/" + selectedRest,
          });
    }
    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        const restData:IrestData = this.props.restData
        return (
            <div>
                {!restData.isLoading ?
                    <div className={classes.oloHomeContainer}>
                        <TopNav />
                        <div className={classes.appBarSpacer} />
                        <BannerSection />
                        {/* <div className="gallery-section">
                            {this.state.ImageAdvertisement.length ?
                            <MultiSlide srcList={this.state.ImageAdvertisement} />
                                : ""
                            }
                        </div> */}

                        {/* <BrowsePlaces /> */}
                        <PopularRests restList ={d_homeDetails.RestaurantList[0].RestaurantDeliveryList} showMeals = {this.showMeals} />
                        <FavRecipe restList ={d_homeDetails.RestaurantList[0].RestaurantDeliveryList} showMeals = {this.showMeals}  />
                        {/* <FeaturedRests /> */}

                        {/* <div className="footer-section">
                            <FooterSection links={{
                                contact:restData.homeDetails.StrRestaurantContactUs, about:restData.homeDetails.StrRestaurantAboutUs
                                }}
                                handleNav = {this.handleNav}
                                 /> 
                        </div>*/}
                        <FooterSection StrRestaurantLogo= {d_homeDetails.StrRestaurantLogo} />
                    </div>
                    : (
                        <div className="progress1" style={{ width: "100%" }}>
                            <LinearProgress color="primary" />
                        </div>
                    )
                }
                <FormDialog  open = {this.state.navIndex === 0} 
                isLoading= {this.state.isLoading.order}
                    handleSubmit={this.getOrderStatus}
                handleClose = {()=> this.setState({navIndex : null})} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      restData: state.restListReducer,
    };
  };
const mapDispatchToProps = (dispatch) => {
    return {
        getData: (queryParams, url, type) =>
          dispatch(getDataWithTypeAction(queryParams, url, type)),
        getDataWithParams: (queryParams, url, type, other) =>
          dispatch(getDataWithTypeAction(queryParams, url, type, {...other, minLoading:true})),
          dispatchSetData: (params) =>
      dispatch({type:'Set_Data', payload:params}),
    }
}


export default compose<any, any>(
    withRouter,
    withStyles(homeStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(OloHome);
