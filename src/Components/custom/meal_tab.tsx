import { Button, FormControlLabel, Switch, withStyles, CircularProgress } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { HDCheckTotalAmount, HDCheckTotalAmountParams, ProPubSessionId, GetMenuDetailsSingleApiParams, GetMenuDetailsSingleApi,tableNameValidateParams,tableNameValidate } from "../../Constants/OloApi";
import { IMenuDetailsSingleApi, ImyCart, MenuHeadList, MenuItemList, Modifier } from "../../Models/restDetailModel";
import { RestaurantDeliveryList, IrestData,IMyPOSMenuDetail } from "../../Models/RestListModel";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import FullScreenDialog from "../full_dialog";
import { a11yProps, TabPanel } from "../UiComps/VerticalTabs";
import { format } from "date-fns";
import { RestHeader } from "../../Pages/comps/rest_detail_header";
import { MealList, ModsDrawer, TableDrawer } from "../../Pages/comps/rest_details_comps";
import clsx from "clsx";

class MealTab extends React.Component<any, any> {
  readonly restData:IrestData = this.props.restData;
  readonly FlavourCode = this.restData.homeDetails.MyPOSMenuDetail ? this.restData.homeDetails.MyPOSMenuDetail.IntMyPOSPUSHFlavourCode : 0 // 1= "eMenu" 2="JustOrder"
  readonly tableList = this.restData.tableList

  // StrMyPOSPUSHFlavourDescription: "eMenu"
  state = {
    menuTabValue: 0,
    isDialogeOpen: false,
    searchKey: "",
    MenuItemList: [],
    filter: { isVeg: false },
    cartTotal: 0,
    myCart: [],
    itemAmt: 0,
    itemQty: 1,
    value: 0,
    MenuItemModifier: [],
    checked: [],
    isOpenDr: false,
    selectedRest: { ...this.restData.restObj },
    modsData: [],
    menuDetails: {flavourCode:0,flavourDescription:"", MenuHeadList: [], MenuItemList: [], MenuItemModifierList: [] },
    currentMod: {
      menu: { Modifier: [] },
      hid: "",
      mid: "",
      Modifier: [],
      mealPrice: 0,
    },
    selectObj: {...this.restData.selectObj},
    toggle:{ askTable:false},
    tableList:[...this.tableList],
    justOrderData:{isValidTable:null}
  };
  
  constructor(props){
    super(props)
  }
  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    let { MenuHeadList, MenuItemList, MenuItemModifierList } = restData.menuDetails;
    if ( MenuHeadList !== null && MenuHeadList.length && state.menuDetails.MenuHeadList.length < 1 ) {
      let menuItemList = restData.updatedMenuItemList.length ? restData.updatedMenuItemList : [...MenuItemList].map((obj) =>  {
          obj.Qty = 0;
          obj.cartQty = 0;
          return obj;
      })
      let flavourCode = restData.menuDetails.IntMyPOSPUSHFlavourCode ? restData.menuDetails.IntMyPOSPUSHFlavourCode : 0;
      return { menuDetails: { ...state.menuDetails, MenuHeadList, MenuItemList, MenuItemModifierList,flavourCode },MenuItemList:menuItemList }
    }
    else if (state.selectObj !== restData.selectObj) {
      return { selectObj: restData.selectObj }
    }
    // else if( state.selectedRest !== restData.restObj ) {
    //   return {selectedRest : restData.restObj}
    // }
    return null
  }
  componentDidMount = () => {
    const { menuDetails,selectObj } = this.state
    switch (this.FlavourCode) {
      case 2: {
        if(this.state.tableList.length && this.state.tableList[0].PropPubTableNo) {return}
        else {
        this.setState({toggle:{...this.state.toggle, askTable:true}})
        }
      }
        break;
      case 0 || 1: {
        if (menuDetails.MenuHeadList.length < 1 ) {
        const restId = selectObj.restId
        const query = { ...GetMenuDetailsSingleApiParams }
        query.StrLocRestaurantId = restId;
        const reqParams = { minLoading: true }
        this.props
          .getDataWithParams(query, GetMenuDetailsSingleApi, "menuDetails", { ...reqParams })
        }
      }
      default:
        break;
    }
    if (menuDetails.MenuHeadList.length < 1 ) {
      const restId = selectObj.restId
      const query = { ...GetMenuDetailsSingleApiParams }
      query.StrLocRestaurantId = restId;
      const reqParams = { minLoading: true }
      this.props
        .getDataWithParams(query, GetMenuDetailsSingleApi, "menuDetails", { ...reqParams })
    }
    if(this.props.restData.myCart.length) {
      this.setState({myCart:this.restData.myCart, cartTotal:this.restData.cartTotal,menuItemList:this.restData.updatedMenuItemList })
    }
  };

  filterBy = (value) => {
    let { filter } = this.state;
    let isTrue = filter[value];
    let filteredList = this.state.MenuItemList;
    if (!isTrue)
      filteredList = this.props.restData.menuDetails.MenuItemList.filter(
        (menu) => menu.PropPubVegNonVeg === "Veg"
      );
    else {
      filteredList = this.props.restData.menuDetails.MenuItemList;
    }

    this.setState({
      ...this.state,
      filter: { ...filter, [value]: !isTrue },
      MenuItemList: [...filteredList],
    });
  };
  searchMenu = (e) => {
    let { name, value } = e.target;
    let filteredList = this.props.restData.menuDetails.MenuItemList.filter(
      (menu) => {
        let keyRegx = new RegExp(value, "i");
        let temp = menu.PropPubMenuItemDescription.search(keyRegx);
        return temp === -1 ? false : true;
      }
    );
    this.setState({ [name]: value, MenuItemList: [...filteredList] });
  };

  toggleCounter = (headId, menuId) => {
    const { actMenu: MenuItem } = this.getActive(headId, menuId);

    let itemIndex = this.state.myCart.findIndex(
      (obj) => obj.MenuItem === MenuItem
    );
    return itemIndex;
  };
  handleTableChange = (value) => { 
     let params = {...tableNameValidateParams};
     params.IntLocRestaurantId = this.restData.selectObj.restId
     params.StrLocTableName = value.toString();
    this.props.getDataWithParams(params,tableNameValidate,'',{})
    .then(obj=> {
      const {boolMyPOSTableValidate} = obj.payload
      let tableList = [...this.state.tableList];
      tableList.push({PropPubTableNo:value.toString()})
      this.setState({justOrderData:{...this.state.justOrderData,isTableValid:obj.payload.boolMyPOSTableValidate}, toggle:{...this.state.toggle,askTable:!boolMyPOSTableValidate },tableList  })
    } )
  }
  //checklist
  handleToggleMod = (value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    let items = { ...this.state.currentMod },
      item = items.Modifier[value];
    let mealPrice = items.mealPrice;

    if (currentIndex === -1) {
      newChecked.push(value);
      mealPrice += item.Price;
    } else {
      newChecked.splice(currentIndex, 1);
      mealPrice -= item.Price;
    }
    this.setState({
      checked: newChecked,
      currentMod: { ...this.state.currentMod, mealPrice: mealPrice },
    });
  };

  addMenuToCart = (hid, mid) => {
    const { actMenu: MenuItem, actHead } = this.getActive(hid, mid);
    if (actHead.PropPubModifierLinked === "0") {
      // to_do create session cart Item
      let cartItem = {
        ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
        ProPubIntQty: 1,
        ProPubIntMenuComboModifier: 0,
        ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
        ProPubIntSelectedRowIndex: this.state.myCart.length,
        ProPubSessionId ,
        ProPubStrPreModifierCode: "",
        PropPubRate: MenuItem.PropPubRate,
      };
      let cartItemExt = {
        ...cartItem,
        PropPubPrice: MenuItem.PropPubRate,
        MenuItem,
      };
      let cartTotal = this.state.cartTotal + MenuItem.PropPubRate;
      // menu qty update
    let menuItemList:MenuItemList[] = [...this.state.MenuItemList];
    let menuIndex = menuItemList.findIndex(obj=> obj.PropMenuItemCode === mid ) 
    let menuItem = {...menuItemList[menuIndex]};
    menuItem.Qty += 1
    menuItem.cartQty += 1
    menuItemList[menuIndex] = menuItem;
      this.setState({
        ...this.state,
        myCart: [...this.state.myCart, cartItemExt],
        cartTotal,
        MenuItemList:menuItemList
      });
    } else {
      this.showMods(hid, mid);
    }
  };

  //mods
  showMods = (hid, mid) => {
    const { actMenu, actMod } = this.getActive(hid, mid);
    this.setState({
      currentMod: {
        Modifier: actMod,
        hid,
        mid,
        menu: actMenu,
        mealPrice: actMenu.PropPubRate,
      },
      isOpenDr: true,
      checked: [],
    });
  };

  gotoCheck = () => {
    const {myCart} = this.state;
   let restObj = this.restData.restObj
   if(Number(restObj.MinOrder) > this.state.cartTotal) {
     let errorObj = {Message:`Minimum order value for online order is ${restObj.MinOrder}, Please add few more items.`}
     this.props.dispatchError({errorObj});
    // alert(errorObj.Message);
     return;
   }
    else {
      let PropMenuItemDetails = [];
    let PropCounterSaleOrderDetail= [
      {
        ProPubSessionId,
        ProPubStrPaymode: "C",
      }
    ];
    myCart.forEach((item:ImyCart, i) => {
      const { MenuItem } = item;
      let saleItem = {
        ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
        ProPubIntQty: item.ProPubIntQty,
        ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
        ProPubStrPreModifierCode: "",
        ProPubIntMenuComboModifier: 0,
        ProPubIntSelectedRowIndex: i,
        ProPubSessionId,
      };
      let addonObj = {
        ProPubIntMenuComboModifier:0,
        ProPubStrItemDescription:"",
        ProPubBoolIsAllowChange:true,
        ProPubStrPreModifierCode:"",
        ProPubIntQty:0,
        ProPubStrModifierCode:"",
        ProPubSessionId,
        ProPubIntSelectedRowIndex:i
    }
    item.addonList && item.addonList.forEach((don) => {
        addonObj.ProPubStrItemDescription = don.ProPubStrItemDescription;
        addonObj.ProPubIntQty = don.ProPubIntQty;
        addonObj.ProPubStrModifierCode = don.ProPubStrModifierCode;

        PropMenuItemDetails.push(addonObj);
      } )
      
      PropMenuItemDetails.push(saleItem);

    });
    let queryParams = {
      ...HDCheckTotalAmountParams,
      IntLocRestaurantId: restObj.RestaurantId,
      strLocOrderDate: format( new Date(), 'dd/MM/yyyy'),
    };
    queryParams.PropMenuItemDetails= JSON.stringify(PropMenuItemDetails);
    queryParams.PropCounterSaleOrderDetail= JSON.stringify(PropCounterSaleOrderDetail);
    
    this.props.dispatchSetData({
      myCart: this.state.myCart,
      updatedMenuItemList:this.state.MenuItemList,
      cartTotal:this.state.cartTotal,
      PropMenuItemDetails:queryParams.PropMenuItemDetails,
      PropCounterSaleOrderDetail:queryParams.PropCounterSaleOrderDetail
    });
    this.props.getData(
      queryParams,
      HDCheckTotalAmount,
      "totalAmountObj"
    )
    // .then(obj=> this.props.history.push("/checkout/"))
    // .then(obj=> console.log('resp: ',obj, 'params',queryParams))
    this.props.history.push("/checkout/")
    }
  };

  toggleDrawer = (isTrue) => {
    this.setState({ isOpenDr: isTrue });
  };
  minusMenuQty = (headId, menuId,cartId?) => {
    const { actMenu: MenuItem } = this.getActive(headId, menuId);
    // 1. Make a shallow copy of the items
    let items = [...this.state.myCart];
    let itemIndex = cartId >= 0 ? cartId : items.findIndex(
      (obj: ImyCart) =>
        obj.ProPubStrMenuItemCode == menuId &&
        obj.MenuItem.PropPubMenuHeadCode == headId
    ) 
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[itemIndex] };
    // cart update
    if (item.ProPubIntQty > 1) {
      item.ProPubIntQty -= 1;
      item.PropPubPrice -= MenuItem.PropPubRate;
      if (item.addonList && item.addonList.length) {
        item.addonPrice -= item.addonRate;
        item.addonList.forEach((tem) => (tem.ProPubIntQty -= 1));
        items[itemIndex] = item;
        this.setState({
          myCart: items,
          cartTotal:
            this.state.cartTotal - (MenuItem.PropPubRate + item.addonRate),
        });
      } else {
        items[itemIndex] = item;
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - MenuItem.PropPubRate,
        });
      }
    } else {
      cartId ? items.splice(cartId, 1) :  items.splice(itemIndex, 1);
      if (item.addonList && item.addonList.length) {
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - item.PropPubRate - item.addonRate,
        });
      } else {
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - item.PropPubRate,
        });
      }
    }
    
    // menu qty update
    let menuItemList:MenuItemList[] = [...this.state.MenuItemList];
    let menuIndex = menuItemList.findIndex(obj=> obj.PropMenuItemCode === menuId ) 
    let menuItem = {...menuItemList[menuIndex]};
    menuItem.Qty -= 1
    menuItem.cartQty -= 1
    menuItemList[menuIndex] = menuItem;
    this.setState({MenuItemList:menuItemList})
  };
  plusMenuQty = (headId, menuId, cartId?) => {
    const { actMenu, actHead } = this.getActive(headId, menuId);

    if (actHead.PropPubModifierLinked === "1") {
      if(cartId >= 0) {
        this.plusCartQty(headId, menuId, cartId)
      }
      else {
      this.showMods(headId, menuId);
      }
    } else {
      let items: ImyCart[] = [...this.state.myCart];
      let itemIndex = items.findIndex(
        (obj: ImyCart) =>
          obj.ProPubStrMenuItemCode == menuId &&
          obj.MenuItem.PropPubMenuHeadCode == headId
      );
      let item: ImyCart = { ...items[itemIndex] };
      item.ProPubIntQty += 1;
      item.PropPubPrice += actMenu.PropPubRate;
      let cartTotal = this.state.cartTotal + item.PropPubRate;
      items[itemIndex] = item;
      // menu qty update
    let menuItemList:MenuItemList[] = [...this.state.MenuItemList];
    let menuIndex = menuItemList.findIndex(obj=> obj.PropMenuItemCode === menuId ) 
    let menuItem = {...menuItemList[menuIndex]};
    menuItem.Qty += 1
    menuItem.cartQty += 1
    menuItemList[menuIndex] = menuItem;

      this.setState({ myCart: items, cartTotal,MenuItemList:menuItemList });
    }
  };

  //for tabs change handling
  handleChangeMenuTab = (
    event: React.ChangeEvent<{}>,
    menuTabValue: number
  ) => {
    this.setState({
      ...this.state,
      menuTabValue,
    });
  };

  addMenuToCartWithAddon = (hid, mid) => {
    const { actMenu: MenuItem } = this.getActive(hid, mid);
    //cart Item
    let cartItem = {
      ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
      ProPubIntQty: 1,
      ProPubIntMenuComboModifier: 0,
      ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
      ProPubIntSelectedRowIndex: this.state.myCart.length,
      ProPubSessionId,
      ProPubStrPreModifierCode: "",
      PropPubRate: MenuItem.PropPubRate,
      PropPubPrice: MenuItem.PropPubRate,
      MenuItem,
    };

    let addonList = [],
      price = 0;
    this.state.checked.length &&
      this.state.checked.forEach((add) => {
        let mod = this.state.currentMod.Modifier[add];
        price += mod.Price;
        let addObj = {
          ProPubIntMenuComboModifier: "0",
          ProPubStrItemDescription: mod.ModifierName,
          ProPubBoolIsAllowChange: mod.AllowChange,
          ProPubStrModifierQtyCode: "0",
          ProPubStrPreModifierCode: "",
          ProPubIntQty: 1,
          ProPubStrModifierCode: mod.ModifierCode.toString(),
          ProPubSessionId,
          ProPubIntSelectedRowIndex: this.state.myCart.length,
        };
        addonList.push(addObj);
      });
    let saleItem = {
      ...cartItem,
      addonList,
      addonRate: price,
      addonPrice: price,
    };
    let cartTotal =
      this.state.cartTotal + MenuItem.PropPubRate + saleItem.addonPrice;
      
      // menu qty update
    let menuItemList:MenuItemList[] = [...this.state.MenuItemList];
    let menuIndex = menuItemList.findIndex(obj=> obj.PropMenuItemCode === mid ) 
    let menuItem = {...menuItemList[menuIndex]};
    menuItem.Qty += 1
    menuItem.cartQty += 1
    menuItemList[menuIndex] = menuItem;

    this.setState({
      ...this.state,
      myCart: [...this.state.myCart, saleItem],
      cartTotal,
      checked: [],
      MenuItemList:menuItemList
    });
    this.toggleDrawer(false);
  };
  
  

  getActive(hid, mid) {
    const { restData } = this.props;
    const { MenuItemList } = this.state;
    const menuDetails: IMenuDetailsSingleApi = restData.menuDetails;
    const { MenuItemModifierList,  } = menuDetails;
    const actHead: MenuHeadList = menuDetails.MenuHeadList.find(
      (head) => head.PropPubMenuHeadCode === hid
    );
    const actMod: Modifier[] = MenuItemModifierList.Modifier.filter((mod) => {
      let modItems = mod.MenuItemCode.split(","),
        id = modItems.indexOf(mid);
      return id === -1 ? false : true;
    });
    const actMenu: MenuItemList = MenuItemList.find(
      (obj) => obj.PropPubMenuHeadCode === hid && obj.PropMenuItemCode === mid
    );
    return { actMenu, actHead, actMod };
  }

  render() {
    const { restData } = this.props;
    const menuDetails: IMenuDetailsSingleApi = restData.menuDetails;
    const { MenuHeadList } = menuDetails;
    return (
      <section className="all-partners">
        <div className="container">
          <div className="row border " id="tab-header">
            <div className="col-12 col-md-6">
              {this.state.selectedRest.RestaurantId && (
                <RestHeader selectedRest={this.state.selectedRest} ></RestHeader>
              )}
            </div>
            <div className="col-12 col-md-4">
              <div className="input-group mt-md-2">
              <div className="input-group-prepend">
                <i className="fa fa-search text-muted" />
                </div>
                <input 
                    placeholder="search menu item"
                    id="standard-start-adornment"
                    onChange={this.searchMenu}
                    value={this.state.searchKey}
                    name="searchKey"
                    className="form-control "
                />
                

              </div>

            </div>
            <div className=" col-md-2 filter-box ">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.isVeg}
                    onChange={() => this.filterBy("isVeg")}
                    name="Veg"
                    color="primary"
                  />
                }
                label="Veg"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12  p-md-0">
{
  this.state.menuDetails.MenuHeadList.length ? 
      <div className= {clsx("tab-pane", this.FlavourCode === 1 && "e-menu")}  id="order-online">
        <div className="">
          <div className="order-tabs">
            <Tabs
              value={this.state.menuTabValue}
              onChange={this.handleChangeMenuTab}
              orientation={
                this.props.width === ("xs" || "sm") ? "horizontal" : "vertical"
              }
              variant="scrollable"
              className=" menu-list"
              aria-label="simple tabs example"
              scrollButtons="off"
            >
              {MenuHeadList.map((obj, i) => (
                <Tab
                  label={obj.PropPubMenuHeadDescription}
                  key={obj.PropPubMenuHeadCode}
                  className="nav-item"
                  {...a11yProps({
                    i,
                    heading: obj.PropPubMenuHeadDescription,
                    hid: obj.PropPubMenuHeadCode,
                  })}
                />
              ))}
            </Tabs>
            <div className="bg-light meals px-md-4 tab-content">
              {MenuHeadList.map((head, i) => {
                return (
                  <TabPanel value={this.state.menuTabValue} key={i} index={i}>
                    <div className="tab-pane">
                      <div className="all-meals-tab">
                        <div className="all-meal-dt">
                          <div className="row">
                            <div className="col-12 meal-title">
                              <h3> {head.PropPubMenuHeadDescription} </h3>
                            </div>
                            {this.state.MenuItemList.map((item:MenuItemList, j) => {
                              return item.PropPubMenuHeadCode === head.PropPubMenuHeadCode ? 
                               (
                                <div key={j} className="col-12 pm-right">
                                  <div className="meals-dt">
                                    <MealList
                                      toggleCounter={this.toggleCounter}
                                      plusMenuQty={this.plusMenuQty}
                                      minusMenuQty={this.minusMenuQty}
                                      addMenuToCart={this.addMenuToCart}
                                      item={item}
                                      PropPubModifierLinked={
                                        head.PropPubModifierLinked
                                      }
                                      i={i}
                                      flavourCode = {this.state.menuDetails.flavourCode}
                                    ></MealList>
                                  </div>
                                </div>
                              ): null
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                );
              })}
            </div>
          </div>
          {this.state.menuDetails.flavourCode !== 1 &&
            <div id="tabs-cart-total">
            <div className="view-cart">
              <p>
                {" "}
                {this.state.myCart.length + " Items | "}{" "}
                <i className="rupee"></i>&nbsp;{this.state.cartTotal.toFixed(2)}{" "}
              </p>
              <h5>( All prices are exclusive of Taxes.)</h5>
            </div>

            <div className="book">
              <Button
                onClick={() =>
                  this.setState({
                    isDialogeOpen: true,
                  })
                }
                disabled={this.state.myCart.length < 1}
                endIcon={<span className="material-icons">shopping_cart</span>}
              >
                View Cart
              </Button>
            </div>
          </div>
          }
          <FullScreenDialog
            heading={`Your Order (${this.state.myCart.length})`}
            handleClose={() =>
              this.setState({
                isDialogeOpen: false,
              })
            }
            isOpen={this.state.isDialogeOpen}
          >
            <div>
            {this.state.myCart.length &&
                    this.state.myCart.map((item, i) => {
                      return (
                        <MealList
              toggleCounter={this.toggleCounter}
              plusMenuQty={this.plusMenuQty}
              minusMenuQty={this.minusMenuQty}
              addMenuToCart={this.addMenuToCart}
              item={ item.MenuItem }
              cart={ item }
              isCart={ true }
              cartId={ i }
              key={ i }
            ></MealList>
                      )
                    })
                  }
                  <div className=" border-top d-flex p-2 cart-footer">
                  <div className="ml-md-auto">                    
                      <h4>
                        <span className="rupee"></span>{" "}
                        {this.state.cartTotal.toFixed(2)}
                      </h4>
                      <b>SubTotal</b>
                    </div>
                    <div className="ml-auto ml-md-3">
                      <Button color="primary" variant="contained" onClick={this.gotoCheck}>
                        Continue
                      </Button>
                    </div>
                </div>
            </div>
          </FullScreenDialog>
        </div>

        <ModsDrawer
          isOpenDr={this.state.isOpenDr}
          toggleDrawer={this.toggleDrawer}
          currentMod={this.state.currentMod}
          handleToggleMod={this.handleToggleMod}
          checked={this.state.checked}
          addMenuToCartWithAddon={this.addMenuToCartWithAddon}
        ></ModsDrawer>
        <TableDrawer
          isOpenDr={this.state.toggle.askTable}
          toggleDrawer={(askTable)=> this.setState({toggle:{...this.state.toggle, askTable}}) }
          title= 'Table Number'
          handleSubmit={this.handleTableChange}
          data={{isValidTbl:true}}
        ></TableDrawer>
      </div>
    : (
                  <div className='center-loader1'>
                    <CircularProgress />
                  </div>
                )}
    </div>
    </div>
  </div>
</section>
    );
  }
  
  
  plusCartQty = (headId, menuId,cartId) => {
    // const { actMenu, actHead, actMod } = this.getActive(headId, menuId);
    const {myCart} = this.state
    let items = [...myCart];
    let item = { ...items[cartId] };
    item.addonPrice += item.addonRate
    item.PropPubPrice += item.PropPubRate
    item.ProPubIntQty += 1
    item.addonList.forEach(obj=>  obj.ProPubIntQty += 1)
    items[cartId] = item; 
    let cartTotal =
      this.state.cartTotal + item.PropPubRate + item.addonRate;

    // menu qty update
    let menuItemList:MenuItemList[] = [...this.state.MenuItemList];
    let menuIndex = menuItemList.findIndex(obj=> obj.PropMenuItemCode === menuId ) 
    let menuItem = {...menuItemList[menuIndex]};
    menuItem.Qty += 1
    menuItem.cartQty += 1
    menuItemList[menuIndex] = menuItem;

    this.setState({
      myCart: items,
      cartTotal,
      MenuItemList:menuItemList
    });
  }
}
const mapStateToProps = (state) => {
  return {
    restData: state.restListReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, {...other, minLoading:true})),
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
    dispatchError: (errorObj) =>
      dispatch({type:'local_error', payload:errorObj}),
    dispatchSetData: (params) =>
      dispatch({type:'Set_Data', payload:params}),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(MealTab);
