import React, { useState } from "react";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
  Chip,
  Drawer,
  CircularProgress,
} from "@material-ui/core";
import {
  d_myCart,
  d_CheckTotalAmount,
  d_otpSend,
  d_getCustomerId,
  d_paymentMethodList,
  d_createCustomerData,
  d_addressList,
  d_homeDetails,
  d_getOrder,
} from "../../Constants/dummy";
import { InstructPanel, AddForm } from "./bill_sec_comps";
import {
  getDataWithTypeAction,
  changeLocationAction,
  postData,
} from "../../Store/Actions/restListAction";
import { compose } from "recompose";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { connect } from "react-redux";
import axios from "axios";
import * as oloApi from "../../Constants/OloApi";
import { androidHeader } from "../../Constants/DishCoApi";
import { validateEmail,addressValidation } from "../../Store/Actions/helperAction";
import { Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { ContentLoad1 } from "../../Components/UiComps/loading_screen";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 36,
    "&$expanded": {
      minHeight: 36,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(
  createStyles({
    input: {
      "& .MuiOutlinedInput-input": {
        padding: "10px,14px",
      },
      "& .MuiInputLabel-outlined": {
        transform: "translate(14px, 12px) scale(1)",
      },
    },
  })
);

class BillSection extends React.Component<any, any> {
  //  classes = useStyles()
  state = {
    expanded: "panel1",
    toggle:{instructPanel:false},
    signIn: { fname: "", email: "" },
    orderObj: d_getOrder,
    mob: "",
    userOtp: "",
    instruction: "",
    Add: { home: "", line1: "", pin: "" },
    errorObj: { home: "", line1: "", pin: "", mob: "",otp:"",email:'', },
    custObj: { ...d_getCustomerId, CustomerId: 0 },
    myCart: d_myCart,
    checkObj: d_CheckTotalAmount,
    otpSend: {d_otpSend, OTP:null},
    payMethod: "Cash On Delivery",
    isRegistered: false,
    addFormValues: { home: "", line1: "", pin: "" },
    addList:d_addressList,
    selectedAdd:d_addressList[0],
    restPayOptionList:d_paymentMethodList
  };
 
  handleChangePanel = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    let isOpen = newExpanded ? panel : false;
    this.setState({ expanded: isOpen });
  };
  handleLogin = () => {
    const { mob, signIn } = this.state;
    const { postData ,getDataWithParams} = this.props;
    const {
      postMobileParams,
      postMobile,
      createCustomerParams,
      createCustomer,
      getCustomerId,
    } = oloApi;
    let config = {
      header: androidHeader,
      data: {},
    };
    if (this.state.custObj.CustomerId && this.state.custObj.CustomerId === 0) {
      // for sign in
      let isEmail = validateEmail(signIn.email);
      if(!isEmail) {
        this.setState({errorObj:{...this.state.errorObj, email:'Please enter valid email address'}});
        return;
      }
      
      let data = { ...createCustomerParams };
      data.StrLocUsername = signIn.fname;
      data.StrLocEmailId = signIn.email;
      data.StrLocMobile = mob;
      config.data = data;
      axios.post(createCustomer, { ...config }).then((obj: any) => {
        if (obj.Message === "Success") this.setState({ otpSend: obj.data });
      });
      this.setState({ isRegistered: false });

    } else {
      if (mob.length < 10) {
        this.setState({
          errorObj: {
            ...this.state.errorObj,
            mob: "Mobile number should be minimum 10 digit.",
          },
        });
        return;
      }
      // config.data = { StrLocMobileNo: mob.toString() };
      let postObj = {
        type:'getOtp',
        url:postMobile,
        data: {StrLocMobileNo: mob.toString()},
        tempData:true,
        minLoading:true,
      }
      getDataWithParams( {StrLocMobileNo:mob},getCustomerId, 'custObj', {minLoading:true})
      .then((obj:any)=> {
        this.setState({custObj:obj.payload.custObj}, ()=>  {
          if ( obj.payload.custObj.CustomerId === 0) { return }
          else {
            postData(postObj)
            .then((obj2: any) => {
               this.setState({ otpSend: obj2.payload.getOtp });
            });
          }
        })
        
      })
      
      // axios.post(postMobile, { ...config }).then((obj: any) => {
      //   if (obj.Message === "Success") this.setState({ otpSend: obj.data });
      // });
    }
    // this.setState({ isRegistered: true });
  };
  handleConfirmOtp = () => {
    // isLoading
    const { mob, signIn,otpSend,userOtp } = this.state;
    const { getDataWithParams, restState } = this.props;
    if(otpSend.OTP !== userOtp) {
      this.setState({errorObj:{...this.state.errorObj, otp:'OTP does not match'}});
      return;
    }
    else {
      const {
        getCustomerId
      } = oloApi;

      getDataWithParams(getCustomerId, {StrLocMobileNo:mob}, 'custObj', {minLoading:true})
      .then(obj=> {
        this.setState({custObj:obj.payload.custObj}, ()=>  {
          // todo remove reqprops by restState
          if(this.reqProps.pickStatus === 'delivery') {
            this.getAddressList()
          }
          else return;

        } )
      } )
      this.getPaymentTypes()
    }
    
  };
  getPaymentTypes = () => {
    const {CheckRestaurantsPaymentsParams,CheckRestaurantsPayments} = oloApi;
    const {restState, getDataWithParams} = this.props;
    let url = CheckRestaurantsPayments,
    params = {...CheckRestaurantsPaymentsParams};
    // todo remove hard
    // params.IntLocFlag 
    // params.IntLocRestaurantId = restState.selectedObj.restId;
    getDataWithParams(url, params, 'restPayOptionList', {minLoading:true})
    .then(obj=> this.setState({restPayOptionList:obj.payload.restPayOptionList}) )
  }
  getAddressList = () => {
    const {GetHDAddressListParams,GetHDAddressList} = oloApi;
    const {restState, getDataWithParams} = this.props;
    let url = GetHDAddressList,
    params = {...GetHDAddressListParams};
    params.IntLocCustomerId = this.state.custObj.CustomerId;
    getDataWithParams(url, params, 'addList', {minLoading:true})
    .then(obj=> this.setState({addList:obj.payload.addList}) )
  }

  ChangePayMethod = (e) => {
    let { value } = e.target.name;
    this.setState({ payMethod: value });
  };
  setAddress = (values) => {
    const { updateAddParams, updateAdd } = oloApi;
    const { home,line1,pin } = values;
    const custObj = this.state.custObj;
    const { userState,postData,restData,restState } =this.props;
    const homeDetails = this.state.custObj;
    let data = {...updateAddParams};
    data.IntLocCustomerId = custObj.CustomerId;
    data.strLocFlat_HouseNo = home;
    data.strLocPostCode = pin;
    data.strLocAprt_LocalityName = line1;
    // data.IntLocCity = restState.selectObj.cityId  ; todo remove hard
    // data.IntLocAddressId = dont know   ; todo remove hard
    // data.IntLocDeliveryLocationId = restState.selectObj.areaId ; todo remove hard
    const postObj = {
      type:'userAdd',
      url:updateAdd,
      data,
      minLoading:true,
    }
    postData(postObj)
  };
  addInstruct = (txt) => {
    this.setState({ instruction: txt,toggle:{...this.state.toggle,instructPanel:false} });
  };
  handlePlaceOrder = () => {
    const {InsertOrderDetails,InsertOrderDetailsParams,GetRateOfPledgeParams,GetRateOfPledge} = oloApi;
    const {restData, getDataWithParams, postData} = this.props;
    const {checkObj} = this.state;
    let postObj = {...InsertOrderDetailsParams}
    postObj.IntLocRestaurantId = restData.selectObj.restId
    postObj.strLoCPaymentMode = this.state.payMethod;
    postObj.IntLocCustomerId = this.state.custObj.CustomerId;
    postObj.strLocOrderDate = format(new Date(), 'dd/mm/yyyy');
    postObj.TotalAmount = checkObj.PropTotalAmount;
    postObj.intLocAddressId =  this.state.selectedAdd.AddressId ;
    // todo dont no data to be clearify
    // postObj.PropMenuItemDetails =  [] ;
    // postObj.PropCounterSaleOrderDetail =  [] ;
    // postObj.StrLocDeliveryType =  'H' ;
    // postObj.StrLocPickupTime = restData.restObj.pickupTime  ;
    
    getDataWithParams(GetRateOfPledge,GetRateOfPledgeParams, 'orderObj', {minLoading:true})
    .then(obj=>  {
      this.setState({orderObj:obj});
      postObj.strLocPaymentOrderId = obj.OrderId;
      postData(postObj)
          .then(res=>  { console.log(res) })
    })
  };
  
  reqProps = {pickStatus: (this.props.restData.selectObj.pickStatus || 'delivery' )}
  //_todo remove dummy && reqProps
  render() {
    const {
      myCart,
      checkObj,
      custObj,
      Add,
      errorObj,
      expanded,
      payMethod,
      isRegistered,
      toggle,
    } = this.state;
    const { restData, classes } = this.props;
    return (
      <div id="bill-section">
        <ExpansionPanel
          square
          expanded={true}
          onChange={this.handleChangePanel("bill")}
        >
          <ExpansionPanelSummary aria-controls="billd-content" id="bill-header">
            <header>
              <h4>Your Order</h4>
            </header>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            {checkObj ?
            <div className="your-order">
              <h3 className="title mb-2">Bill Details</h3>
              <table id="bill-table " className="table">
                <thead>
                  <tr>
                    <th>Menu</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {myCart.length &&
                    myCart.map((item, i) => {
                      let MenuItem = item.MenuItem;
                      return (
                        <tr key={i} >
                          <td> {MenuItem.PropPubMenuItemDescription} </td>
                          <td> {item.ProPubIntQty} </td>
                          <td>
                            {" "}
                            <span className="rupee">
                              {" "}
                              {Number(item.PropPubPrice) +
                                Number(item.addonPrice)}{" "}
                            </span>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="py-2">
                {this.state.instruction === "" ? 
                  <Button color="primary" fullWidth onClick={() => this.setState({toggle:{...this.state.toggle,instructPanel:true}}) } > Add instructions (optional) </Button>
                  :
                  <div className="px-2 " >
                  <b> Instruction: </b>
                  <br />
                  {this.state.instruction}
                  </div>
                }
                
                
                <Drawer
                  PaperProps={{ style: { maxHeight: "70vh" } }}
                  anchor="bottom"
                  open={toggle.instructPanel}
                  onClose={() => this.setState({toggle:{...this.state.toggle,instructPanel:false}}) }
                >
                <InstructPanel
                  addInstruct={this.addInstruct}
                  handleClose={ ()=> this.setState({toggle:{...this.state.toggle,instructPanel:false}})   }
                  errorObj={{ isError: false, Msg: "" }}
                />
                </Drawer>
              </div>
              <table className="tax-table table ">
                <tbody>
                  <tr>
                    <td colSpan={2} > Sub Total </td>
                    <td> {checkObj.PropTotalAmount} </td>
                  </tr>
                  <tr>
                    <td colSpan={2}> Taxes and Charges </td>
                    <td> {checkObj.PropTotalTax} </td>
                  </tr>
                  <tr>
                    <td> &nbsp; </td>
                    <td>
                      {" "}
                      <h3>Grand Total</h3>{" "}
                    </td>
                    <td>
                      {" "}
                      <h3>{checkObj.PropTotalAmount} </h3>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            :
            <ContentLoad1 />
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={true}
          onChange={this.handleChangePanel("Login")}
        >
          <ExpansionPanelSummary
            aria-controls="Logind-content"
            id="Login-header"
          >
            <header>
              {custObj.CustomerId && custObj.CustomerId !== 0 ? (
                <>
                  <h4> {custObj.CustomerName}  <span className="text-primary ml-2" onClick={()=> this.setState({
                  ...this.state, custObj:{...this.state.custObj, CustomerId : undefined}
                  }) } > change Login </span> </h4>
                  <h5> You have successfully logged in </h5>
                </>
              ) : (
                <>
                  <h4>Login / SignUp </h4>
                  <h5> Please Login or Create account with us </h5>
                </>
              )}
            </header>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="right-contact-dt w-100">
              {(custObj.CustomerId === undefined ||
                custObj.CustomerId === 0) && (
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="number"
                      name="mob"
                      label="Phone Number"
                      value={this.state.mob}
                      error={this.state.errorObj.mob !== ""}
                      helperText={this.state.errorObj.mob}
                      onChange={(e) => this.setState({ mob: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fas fa-mobile-alt " />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 10,
                      }}
                    />
                    {(custObj.CustomerId !== undefined && custObj.CustomerId == 0) && <div>
                        <TextField
                          variant="outlined"
                          fullWidth
                          name="fname"
                          required
                          label="First Name"
                          value={this.state.signIn.fname}
                          onChange={(e) =>
                            this.setState({
                              signIn: {
                                ...this.state.signIn,
                                fname: e.target.value,
                              },
                            })
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <i className="fas fa-user" />
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                        <TextField
                          variant="outlined"
                          fullWidth
                          type="email"
                          label="email"
                          placeholder="Email"
                          value={this.state.signIn.email}
                          onChange={(e) =>
                            this.setState({
                              signIn: {
                                ...this.state.signIn,
                                email: e.target.value,
                              },
                            })
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <i className="fas fa-envelope" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      }

                    <div className="mt-3 float-right" >
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleLogin}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

              {(custObj.CustomerId && custObj.CustomerId !== 0) && <div>
                  { this.state.otpSend.OTP === null ? <ContentLoad1 />
                    :
                  <div>
                  <small>
                    {" "}
                    otp send to <b> {this.state.mob} </b> mobile number{" "}
                  </small>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="otp"
                    label=""
                    value={this.state.userOtp}
                    error={this.state.errorObj.otp !== ""}
                    helperText={this.state.errorObj.otp}
                    onChange={(e) => this.setState({ userOtp: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-lock" />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      maxLength: 4,
                    }}
                  />
                  <div className="mt-3 float-right">
                    <p onClick={this.handleLogin} className="text-success">
                      {" "}
                      <u>resend otp</u>{" "}
                    </p>
                    <Button
                      color="primary"
                      variant="contained"
                      className="float-right"
                      onClick={this.handleConfirmOtp}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </div>
                  }
                  
                </div>
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>


{this.reqProps.pickStatus === 'delivery' && 
        <ExpansionPanel
          square
          expanded={
            (expanded === "Address" &&
              this.state.custObj.CustomerId !== undefined) ||
            null
          }
          onChange={this.handleChangePanel("Address")}
        >
          <ExpansionPanelSummary
            aria-controls="Address-content"
            id="Address-header"
          >
            <header>
            <h4> Delivery Address </h4>
              {this.state.selectedAdd.AddressId === undefined ? (
                <>
                  <h5> Login to choose address </h5>
                </>
              ) : (
                <>
                  <h5> {`Address Selected: ${this.state.selectedAdd.Address}`} </h5>
                </>
              )}
            </header>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="right-address">
            {this.state.addList.length ? 
            <div id="addList">
              <ul className="list-unstyled">
              {this.state.addList.map((obj, i) => (
              <li key = {i} >
                <h5 className="mb-1"> {obj.Address} </h5>
                <Chip
                    icon={ this.state.selectedAdd.AddressId === obj.AddressId ? <i className="fa fa-check" /> : <i></i>}
                    label="Select this Address"
                    onClick={ ()=> this.setState({selectedAdd: obj }) }
                    color={ this.state.selectedAdd.AddressId === obj.AddressId ? "primary" : "default"}
                  />
              </li>
              ))}
              <li className="py-1"> <Button onClick={()=> this.setState({selectedAdd:{}}) } color="primary" > <u> Add new Address </u> </Button> </li>
              </ul>
            </div> : 
              <Formik
              initialValues={this.state.addFormValues}
              validationSchema={addressValidation}
              onSubmit={this.setAddress}
            >
              {props => <AddForm {...props} />}
            </Formik>
            }
          </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
}
        <ExpansionPanel
          square
          expanded={expanded === "Method"}
          onChange={this.handleChangePanel("Method")}
        >
          <ExpansionPanelSummary
            aria-controls="Method-content"
            id="Method-header"
          >
            <header>
              <h4>Payment Method </h4>
              <h5> Login and select address for payment </h5>
            </header>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="right-payment-method">
            {this.state.restPayOptionList.length ?
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="cod"
                  value={payMethod}
                  onChange={this.ChangePayMethod}
                >
                  {this.state.restPayOptionList.length &&  this.state.restPayOptionList.map((obj, i) => (
                    <FormControlLabel
                    value={obj.PaymentType}
                    control={<Radio />}
                    label={obj.PaymentType}
                    disabled={obj.IsActive !== 1}
                    key={i}
                  />
                ))}
                  
                </RadioGroup>
              </FormControl>
              :
              <ContentLoad1 />
  }

              <div className="checkout-btn py-3 ">
                <Button type="submit" className="btn btn-primary" onClick={this.handlePlaceOrder} >
                  Place Order
                </Button>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(ownProps);
  // console.log(state);
  const {userReducer,restDetailReducer,restListReducer} = state;
  return {
    restData: state.restListReducer,
    userState:userReducer,
    restState:restDetailReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type,other)),
      postData: (config) => dispatch(postData(config)),
    changeLocation: (location) => dispatch(changeLocationAction(location, "")),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(BillSection);
