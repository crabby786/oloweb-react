import { Button, Chip, Drawer, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { ContentLoad1 } from "../../Components/UiComps/loading_screen";
import { d_addressList } from "../../Constants/dummy";
// import { d_addressList, d_CheckTotalAmount, d_getCustomerId, d_myCart } from "../../Constants/dummy";
import * as oloApi from "../../Constants/OloApi";
import { addressValidation, validateEmail } from "../../Store/Actions/helperAction";
import { changeLocationAction, getDataWithTypeAction, postData } from "../../Store/Actions/restListAction";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { AddForm, InstructPanel } from "./bill_sec_comps";
import { withRouter } from "react-router";
import { getCookie,setCookie } from "../../Store/Actions/helperAction";
import { IrestData } from "../../Models/RestListModel";
import { Icustomer } from "../../Models/RestListModel";

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


class BillSection extends React.Component<any, any> {
  readonly restData:IrestData = this.props.restData;
  readonly pickStatus:string = this.props.restData.selectObj.pickStatus;
  state = {
    expanded: "panel1",
    toggle: { instructPanel: false },
    signIn: { fname: "", email: "" },
    orderObj: {},
    mob: "",
    userOtp: "",
    instruction: "",
    Add: { home: "", line1: "", pin: "" },
    errorObj: { home: "", line1: "", pin: "", mob: "", otp: "", email: '',fname:"" },
    custObj: {...this.restData.custObj , CustomerId: undefined },
    myCart: [],
    cartTotal:0,
    checkObj: {...this.restData.totalAmountObj},
    otpSend: { OTP: null},
    payMethod: "",
    isRegistered: false,
    addFormValues: { home: "", line1: "", pin: "" },
    addList: [],
    selectedAdd: {...d_addressList[0], AddressId: null },
    restPayOptionList: [],
    loading:{ otp:false,getCustomerId:false, getAddressList:false  },
    isSubmit:{ mob:false,  },
    selectObj: {
      restId: null,
      cityId: null,
      areaId: null,
      pickStatus: null,
      pickupTime: null,
},
  };
  static getDerivedStateFromProps ( props,state) {
    const {checkObj,selectObj,myCart}= state;
    const {restData}= props;
    
    if ( myCart !== restData.myCart ) {
      return({myCart : restData.myCart})
    }
    if ( checkObj !== restData.totalAmountObj ) {
      return({checkObj : restData.totalAmountObj})
    }
     if ( selectObj !== restData.selectObj ) {
      return({selectObj : restData.selectObj})
    }
    return null
  }
  componentDidMount() {
    //set Coockie
    let user = getCookie("CustomerId");
    if (user) {
      let custObj:Icustomer = new Object();
      custObj.CustomerId = Number(user)
      custObj.Mobile = getCookie('Mobile')
      custObj.CustomerName = getCookie('CustomerName')
      let expanded = this.restData.selectObj.pickStatus === 'delivery' ? "addPanel" : "payPanel" ;
      this.setState({custObj, expanded },()=> {
        this.getPaymentTypes();this.getAddressList();
      });
    }
  }
  handleChangeSigninForm = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      signIn: { ...this.state.signIn, [name]: value }
    })
  }
  handleChangePanel = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    let isOpen = newExpanded ? panel : false;
    this.setState({ expanded: isOpen });
  };
  handleLogin = () => {
    const { mob, signIn } = this.state;
    const { postData } = this.props;
    const {
      postMobile,
      createCustomerParams,
      createCustomer,
    } = oloApi;
    if (this.state.custObj.CustomerId === 0) {
      // for sign in
      let isEmail = validateEmail(signIn.email);
      if (!isEmail) {
        this.setState({ errorObj: { ...this.state.errorObj, email: 'Please enter valid email address' } });
        return;
      }
      if (!signIn.fname) {
        this.setState({ errorObj: { ...this.state.errorObj, fname: 'Name is required' } });
        return;
      }

      let data = { ...createCustomerParams };
      data.StrLocUsername = signIn.fname;
      data.StrLocEmailId = signIn.email;
      data.StrLocMobile = mob;
      let postObj = {
        type:'createUser', 
        url:createCustomer,
        data,
        minLoading:true
      }
      this.props.postData(postObj)
      .then((obj: any) => {
        const user = obj.payload.createUser;
        if (user.Message === "Success") this.setState({ custObj: user,isRegistered: true,
          expanded: this.pickStatus === 'delivery' ? 'addPanel' : 'payPanel' 
         });
      });

    } else {
      if (mob.length < 10 || mob.length > 10) {
        this.setState({
          errorObj: {
            ...this.state.errorObj,
            mob: "Mobile number must be 10 digit longer.",
          },
        });
        return;
      }
      this.setState({ loading: {...this.state.loading, otp:true}, isSubmit:{...this.state.isSubmit, mob:true} });
      // config.data = { StrLocMobileNo: mob.toString() };
      let postObj = {
        type: 'getOtp',
        url: postMobile,
        data: { StrLocMobileNo: mob.toString() },
        tempData: false,
        minLoading: true,
      }
      
      postData(postObj)
                .then((obj2: any) => {
                  this.setState({ otpSend: {...obj2.payload.getOtp}, loading:{...this.state.loading, otp:false} });
                });
    }
  };
  handleConfirmOtp = () => {
    // isLoading
    const { mob, otpSend, userOtp } = this.state;
    const { getDataWithParams } = this.props;
    if (otpSend.OTP !== userOtp) {
      this.setState({ errorObj: { ...this.state.errorObj, otp: 'OTP does not match' } });
      return;
    }
    else {
      this.setState({loading:{...this.state.loading,getCustomerId:true }})
      const {
        getCustomerId
      } = oloApi;

      getDataWithParams({ StrLocMobileNo: mob },getCustomerId, 'custObj', { minLoading: true })
        .then((obj:any) => {
          this.setState({ custObj: obj.payload.custObj,loading:{...this.state.loading,getCustomerId:false }}, () => {
            if ( this.restData.selectObj.pickStatus === 'delivery' && this.state.custObj.CustomerId !== 0 ) {
              this.getAddressList()
              }
            });
            //set Coockie
            let user = getCookie("CustomerId");
            let name = obj.payload.custObj.CustomerName ? obj.payload.custObj.CustomerName : obj.payload.custObj.Name
            if (!user || user !== obj.payload.custObj.CustomerId) {
              setCookie("CustomerId", obj.payload.custObj.CustomerId, 30);
              setCookie("Mobile", obj.payload.custObj.Mobile, 30);
              setCookie("CustomerName", name, 30);  
            }
        })
      this.getPaymentTypes();
      this.setState({
        expanded: this.pickStatus === 'delivery' ? 'addPanel' : 'payPanel'
      })
      
    }

  };
  getPaymentTypes = () => {
    const { CheckRestaurantsPaymentsParams, CheckRestaurantsPayments } = oloApi;
    const {  getDataWithParams } = this.props;
    let url = CheckRestaurantsPayments,
      params = { ...CheckRestaurantsPaymentsParams };
    // to_do ask
    // params.IntLocFlag 
    params.IntLocRestaurantId = this.restData.selectObj.restId ;
    getDataWithParams( params,url, 'restPayOptionList', { minLoading: true })
      .then(obj => this.setState({ 
        restPayOptionList: obj.payload.restPayOptionList,
        
       }))
  }
  getAddressList = () => {
    this.setState({ loading:{...this.state.loading,getAddressList:true }});
    const { GetHDAddressListParams, GetHDAddressList } = oloApi;
    const { getDataWithParams } = this.props;
    let url = GetHDAddressList,
      params = { ...GetHDAddressListParams };
    params.IntLocCustomerId = this.state.custObj.CustomerId;
    getDataWithParams(params,url,  'addList', { minLoading: true })
      .then(obj => this.setState({ addList: obj.payload.addList ,loading:{...this.state.loading,getAddressList:false } }))
  }

  ChangePayMethod = (e) => {
    let { value } = e.target;
    this.setState({ payMethod: value });
  };
  setAddress = (values) => {
    const { updateAddParams, updateAdd } = oloApi;
    const { home, line1, pin } = values;
    const {custObj} = this.state;
    const { postData } = this.props;
    let data = { ...updateAddParams };
    data.IntLocCustomerId = custObj.CustomerId;
    data.strLocFlat_HouseNo = home;
    data.strLocPostCode = pin;
    data.strLocAprt_LocalityName = line1;
    data.IntLocAddressId =  this.state.selectedAdd.AddressId || 0 ;
    data.IntLocCity = this.restData.selectObj.cityId  ; 
    data.IntLocDeliveryLocationId = this.restData.selectObj.areaId ;
    const postObj = {
      type: 'userAdd',
      url: updateAdd,
      data,
      minLoading: true,
    }
    postData(postObj)
  };
  addInstruct = (txt) => {
    this.setState({ instruction: txt, toggle: { ...this.state.toggle, instructPanel: false } });
  };
  handlePlaceOrder = () => {
    const { InsertOrderDetails, InsertOrderDetailsParams, GetRateOfPledgeParams, GetRateOfPledge } = oloApi;
    const { getDataWithParams, postData } = this.props;
    const { restObj,selectObj,PropMenuItemDetails,PropCounterSaleOrderDetail } = this.restData;
    const { checkObj } = this.state;
    let params = { ...InsertOrderDetailsParams,PropMenuItemDetails,PropCounterSaleOrderDetail }
    params.IntLocRestaurantId = restObj.RestaurantId
    //to_do params.strLoCPaymentMode = this.state.payMethod;
    params.strLoCPaymentMode = 'COD|NA|NA|NA';
    params.IntLocCustomerId = this.state.custObj.CustomerId;
    params.strLocOrderDate = format(new Date(), 'dd/MM/yyyy');
    params.TotalAmount = checkObj.PropTotalAmount;
    params.intLocAddressId = this.state.selectedAdd.AddressId;
    params.strLocDeliveryArea = this.state.selectedAdd.Address;
    params.StrLocPickupTime =  format(selectObj.pickupTime, 'hh.mm')  ;
    // to_do ask
    // params.StrLocDeliveryType =  'H' ;
     
    // getDataWithParams(GetRateOfPledgeParams, GetRateOfPledge,  'orderObj', { minLoading: true })
    //   .then(obj => {
    //     this.setState({ orderObj: obj.payload.orderObj });
    //     params.strLocPaymentOrderId = obj.payload.orderObj.OrderId;
    //     let postObj = {type:'placeOrder',url:InsertOrderDetails,data:params}
    //     postData(postObj)
    //       .then((res:any) => { 
    //         const {placeOrder} = res.payload;
    //         if(placeOrder && placeOrder.MessageCode) {
    //           this.props.history.push('/order_place')
    //         }
    //        })
    //   })
  };

  render() {
    const {
      custObj,
      expanded,
      payMethod,
      toggle,
      checkObj
    } = this.state;
    let myCart = this.restData.myCart;
    return (
      <div className="bill-section col-12 py-2 py-md-4">
        <div className="row">
        <div className="col-12 col-md-6 mb-2">
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

              {checkObj && myCart.length ?
                <div className="your-order">
                  <h3 className="title mb-2">Bill Details</h3>
                  <table id="bill-table" className="table">
                    <thead>
                      <tr>
                        <th>Menu</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                       { myCart.map((item, i) => {
                          let MenuItem = item.MenuItem;
                          return (
                            <tr key={i} >
                              <td> {MenuItem.PropPubMenuItemDescription} </td>
                              <td> {item.ProPubIntQty} </td>
                              <td>
                                {" "}
                                <span className="rupee">
                                  {" "}
                                  {item.addonPrice ? Number(item.PropPubPrice) +
                                    Number(item.addonPrice): Number(item.PropPubPrice) }{" "}
                                </span>{" "}
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <div className="py-2">
                    {this.state.instruction === "" ?
                      <Button color="primary" fullWidth onClick={() => this.setState({ toggle: { ...this.state.toggle, instructPanel: true } })} > Add instructions (optional) </Button>
                      :
                      <div className="bg-light border card-body card-body" >
                        <i className="fa fa-times float-right"
                          onClick={() => this.setState({instruction:"" })} 
                        ></i>
                        <div>{this.state.instruction}</div>
                      </div>
                    }


                    <Drawer
                      PaperProps={{ style: { maxHeight: "70vh" } }}
                      anchor="bottom"
                      open={toggle.instructPanel}
                      onClose={() => this.setState({ toggle: { ...this.state.toggle, instructPanel: false } })}
                    >
                      <InstructPanel
                        addInstruct={this.addInstruct}
                        handleClose={() => this.setState({ toggle: { ...this.state.toggle, instructPanel: false } })}
                        errorObj={{ isError: false, Msg: "" }}
                      />
                    </Drawer>
                  </div>
                  <table className=" table " id ="tax-table">
                    <tbody>
                      <tr>
                        <td > Sub Total </td>
                        <td> <span className="rupee"></span>  {checkObj.PropTotalAmount.toFixed(2)} </td>
                      </tr>
                      <tr>
                        <td > Taxes and Charges </td>
                        <td> <span className="rupee"></span> {checkObj.PropTotalTax.toFixed(2)} </td>
                      </tr>
                      <tr>
                        <td >
                          <h3 className="font-weight-bold" >Grand Total</h3>{" "}
                        </td>
                        <td>
                          <h3 className="font-weight-bold"><span className="rupee"></span> {checkObj.PropGrandTotalAmount.toFixed(2)} </h3>{" "}
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
        </div>
        <div className="col-12 col-md-6 mb-2">
        <ExpansionPanel
          square
          expanded={this.state.custObj.CustomerId === undefined || this.state.custObj.CustomerId === 0 }
          onChange={this.handleChangePanel("Login")}
        >
          <ExpansionPanelSummary
            aria-controls="Logind-content"
            id="Login-header"
          >
            <header>
              {custObj.CustomerId && custObj.CustomerId !== 0 ? (
                <>
                  <h4> {custObj.CustomerName || custObj.Name}  <span className="text-primary ml-2" onClick={() => this.setState({
                    ...this.state, custObj: { ...this.state.custObj, CustomerId: undefined }, isSubmit:{...this.state.isSubmit, mob:false},
                    otpSend:{OTP:''}
                  })} > change Login </span> </h4>
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
              {((custObj.CustomerId === undefined && this.state.isSubmit.mob === false) ||
                custObj.CustomerId === 0 ) && (
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
                      onChange={(e) => {
                        return e.target.value.length < 11 ? this.setState({ mob: e.target.value }) : null
                      }}
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
                        error={this.state.errorObj.fname !== ""}
                        helperText={this.state.errorObj.fname}
                        label="First Name"
                        value={this.state.signIn.fname}
                        onChange={(e) => this.handleChangeSigninForm(e)}
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
                        name="email"
                        placeholder="Email"
                        value={this.state.signIn.email}
                        error={this.state.errorObj.email !== ""}
                        helperText={this.state.errorObj.email}
                        onChange={(e) => this.handleChangeSigninForm(e)}
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
                {/* otp send */}
              {(this.state.isSubmit.mob === true && this.state.custObj.CustomerId !== 0) &&
               <div>
                 {this.state.loading.otp || this.state.loading.getCustomerId || this.state.loading.getAddressList
                  ?  <ContentLoad1 /> : <>
                        <h5  >
                          OTP send to <b> {this.state.mob} </b> mobile number{" "}
                        </h5>
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
                            maxLength: 6,
                          }}
                        />
                        <div className="mt-3 ">
                          <span onClick={this.handleLogin} className="text-success">
                            {" "}
                            <u>Resend OTP</u>{" "}
                          </span>
                          <Button
                            color="primary"
                            variant="contained"
                            className="float-right"
                            onClick={this.handleConfirmOtp}
                          >
                            Verify OTP
                    </Button>
                        </div>
                        </>
                        }
                      </div>
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {this.restData.selectObj.pickStatus === 'delivery' &&
          <ExpansionPanel
            square
            expanded={
              expanded === "addPanel" &&
                this.state.custObj.CustomerId > 0
                && this.state.addList.length > 0
            }
            onChange={this.handleChangePanel("addPanel")}
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
              <div className="right-address ">
                {this.state.addList.length && this.state.selectedAdd.AddressId !== undefined ?
                <div id="addList">
                <ul className="list-unstyled">
                  {this.state.addList.length && this.state.addList.map((obj, i) => (
                    <li key={i} className="mb-3" >
                      <h5 className="mb-1"> {obj.Address} </h5>
                      <Chip
                        icon={this.state.selectedAdd.AddressId === obj.AddressId ? <i className="fa fa-check" /> : <i></i>}
                        label="Deliver Here"
                        onClick={() => this.setState({ selectedAdd: obj, expanded:'payPanel' })}
                        color={this.state.selectedAdd.AddressId === obj.AddressId ? "primary" : "default"}
                      />
                    </li>
                  ))}
                  <li className="py-1">
                    <Button onClick={() => this.setState({ selectedAdd: {} })} color="primary" >
                      <u> Add new Address </u> </Button>
                  </li>
                </ul>
              </div>
                :
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
          expanded={expanded === "payPanel"}
          onChange={this.handleChangePanel("payPanel")}
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
            <div className="right-payment-method w-100">
              {this.state.restPayOptionList.length ?
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="cod"
                    value={payMethod}
                    onChange={this.ChangePayMethod}
                  >
                    {this.state.restPayOptionList.length && this.state.restPayOptionList.map((obj, i) => (
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

              <div className=" ">
                <Button type="submit"  size="large" variant="contained" fullWidth color="primary" onClick={this.handlePlaceOrder} disabled = {!this.state.payMethod || !this.state.custObj.CustomerId} >
                  Place Order
                </Button>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(ownProps);
  // console.log(state);
  const { userReducer, restDetailReducer } = state;
  return {
    restData: state.restListReducer,
    userState: userReducer,
    restState: restDetailReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, other)),
    postData: (config) => dispatch(postData(config)),
    changeLocation: (location) => dispatch(changeLocationAction(location, "")),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  withRouter ,
  connect(mapStateToProps, mapDispatchToProps)
)(BillSection);
