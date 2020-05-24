import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Button,
  Switch,
  CircularProgress,
  FormControlLabel,
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import FullScreenDialog from "../full_dialog";
import { TabPanel, a11yProps } from "../UiComps/VerticalTabs";
import {
  RestaurantDeliveryList,
  ICheckTotalAmount,
} from "../../Models/RestListModel";
import {
  HDCheckTotalAmountParams,
  HDCheckTotalAmount,
} from "../../Constants/OloApi";
import { d_TotalAmountObj } from "../../Constants/dummy";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { compose } from "recompose";
import { homeStyle } from "../../Styles/jss/homePageStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  MenuItemList,
  ImyCart,
  IMenuDetailsSingleApi,
  Modifier,
  MenuHeadList,
} from "../../Models/restDetailModel";
import { Counter } from "../FormComps";
import withWidth from "@material-ui/core/withWidth";

const ModsDrawer = (props) => {
  let menu: MenuItemList = props.currentMod.menu,
    Modifier = props.currentMod.Modifier,
    mealPrice = props.currentMod.mealPrice;

  return (
    <Drawer
      PaperProps={{ style: { maxHeight: "70vh" } }}
      anchor="bottom"
      open={props.isOpenDr}
      onClose={() => props.toggleDrawer(false)}
    >
      <header className="border-bottom p-2 px-3">
        <div className="float-right">
          <Button
            variant="outlined"
            onClick={() =>
              props.addMenuToCart(props.currentMod.hid, props.currentMod.mid)
            }
            color="primary"
          >
            {`Add - `}
            <span className="rupee"></span>
            {menu.PropPubRate && menu.PropPubRate.toFixed(2)}
          </Button>{" "}
          <Button
            variant="outlined"
            onClick={() => props.toggleDrawer(false)}
            color="primary"
          >
            cancel
          </Button>
          {/* <i
          className="fa fa-close float-right"
          onClick={() =>
              props.toggleDrawer(false)
          }
        /> */}
        </div>
        <h3>{menu.PropPubMenuItemDescription}</h3>

        <h4 className="text-muted">
          {menu.PropPubMenuItemlineDescription &&
          menu.PropPubMenuItemlineDescription !== "" ? (
            menu.PropPubMenuItemlineDescription
          ) : (
            <span>
              <span className="rupee" />
              {menu.PropPubRate}
            </span>
          )}
        </h4>
      </header>
      <List
        style={{
          width: "100%",
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {Modifier.map((value, i) => {
          const labelId = `checkbox-list-label-${i}`;
          return (
            <ListItem
              key={i}
              role={undefined}
              dense
              button
              onClick={() => props.handleToggleMod(i)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={props.checked.indexOf(i) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.ModifierName} />
              <div>
                {" "}
                <span className="rupee"></span> {value.Price}{" "}
              </div>
            </ListItem>
          );
        })}
      </List>
      <div className="float-right">
        <Button
          variant="outlined"
          onClick={() =>
            props.addMenuToCart(props.currentMod.hid, props.currentMod.mid)
          }
          color="primary"
        >
          {`Add - `}
          <span className="rupee" />
          {mealPrice && mealPrice.toFixed(2)}
        </Button>{" "}
      </div>
    </Drawer>
  );
};

const MealList = (props) => (
  <div className="meal-list">
    <ul className="list-unstyled">
      <li className="meal-list-item">
        <div className="meal-img-box">
          <img
            src={props.item.PropPubImagePath}
            className="img-fluid meal-img"
            alt=""
          />
          <i
            className={props.item.PropPubVegNonVeg == "Veg" ? "veg" : "non veg"}
          ></i>
        </div>
        <div className="caption-meal">
          <h4>{props.item.PropPubMenuItemDescription}</h4>
          {!props.isCart && 
            <h5>{props.item.PropPubMenuItemlineDescription}</h5>
          }
          
          <p className="item-rate">
            <i
              className="rupee"
              aria-hidden="true"
              title="Copy to use rupee"
            ></i>{" "}
            {" " + props.item.PropPubRate}{" "}
          </p>
          <div>
                { props.cart && props.isCart ? props.cart.addonList.map((add, j) => (
                  <span key={j}>
                    {" "}
                    {add.ProPubStrItemDescription}{" "}
                  </span>
                )) : ""}
              </div>
        </div>
        <div className="add-control Qty align-self-center">
          {(props.toggleCounter(
            props.item.PropPubMenuHeadCode,
            props.item.PropMenuItemCode
          ) > -1) || props.isCart ? (
            <Counter
              upgrader={() =>
                props.plusMenuQty(
                  props.item.PropPubMenuHeadCode,
                  props.item.PropMenuItemCode
                )
              }
              degrader={() =>
                props.minusMenuQty(
                  props.item.PropPubMenuHeadCode,
                  props.item.PropMenuItemCode
                )
              }
              count={props.i}
            />
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  props.addMenuToCart(
                    props.item.PropPubMenuHeadCode,
                    props.item.PropMenuItemCode
                  )
                }
              >
                {" "}
                Add{" "}
              </Button>
              {props.PropPubModifierLinked === "1" && (
                <h5 className="text-success mt-1 text-center small">Customizable</h5>
              )}
            </>
          )}
        </div>
      </li>
    </ul>
  </div>
);

class MealTab extends React.Component<any, any> {
  state = {
    menuTabValue: 0,
    searchKey: "",
    isDialogeOpen: false,
    filter: { isVeg: false },
    cartTotal: 0,
    myCart: [],
    itemAmt: 0,
    itemQty: 1,
    value: 0,
    menuList2: [...this.props.restData.menuDetails.MenuItemList],
    MenuItemList: this.props.restData.menuDetails.MenuItemList,
    MenuItemModifier: [],
    checked: [],
    isOpenDr: false,
    modsData: [],
    currentMod: {
      menu: { Modifier: [] },
      hid: "",
      mid: "",
      Modifier: [],
      mealPrice: 0,
    },
  };

  toggleCounter = (headId, menuId) => {
    const { actMenu: MenuItem } = this.getActive(headId, menuId);

    let itemIndex = this.state.myCart.findIndex(
      (obj) => obj.MenuItem === MenuItem
    );
    return itemIndex;
  };
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
      //cart Item
      let cartItem = {
        ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
        ProPubIntQty: 1,
        ProPubIntMenuComboModifier: 0,
        ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
        ProPubIntSelectedRowIndex: this.state.myCart.length,
        ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
        ProPubStrPreModifierCode: "",
        PropPubRate: MenuItem.PropPubRate,
      };
      let cartItemExt = {
        ...cartItem,
        PropPubPrice: MenuItem.PropPubRate,
        MenuItem,
      };
      let cartTotal = this.state.cartTotal + MenuItem.PropPubRate;
      this.setState({
        ...this.state,
        myCart: [...this.state.myCart, cartItemExt],
        cartTotal,
      });
    } else {
      this.showMods(hid, mid);
    }
  };

  //mods
  showMods = (hid, mid) => {
    const { actMenu, actHead, actMod } = this.getActive(hid, mid);
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
    let myCart = [...this.state.myCart];
    let restData: RestaurantDeliveryList = this.props.restObj;
    let PropMenuItemDetails = [];
    let PropCounterSaleOrderDetail: [
      {
        ProPubSessionId: "c57f63a0-86ee-11ea-c844-fb0db4c93d3e";
        ProPubStrPaymode: "C";
      }
    ];
    myCart.forEach((item, i) => {
      const { MenuItem } = item;
      let saleItem = {
        ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
        ProPubIntQty: item.ProPubIntQty,
        ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
        ProPubStrPreModifierCode: "",
        ProPubIntMenuComboModifier: 0,
        ProPubIntSelectedRowIndex: i,
        ProPubSessionId: "a2d01780-8eb6-11ea-c357-2da7f6b1762d",
      };
      PropMenuItemDetails.push(saleItem);
    });
    let queryParams = {
      ...HDCheckTotalAmountParams,
      IntLocRestaurantId: restData.RestaurantId,
      strLocOrderDate: new Date().toDateString(),
      PropMenuItemDetails,
      PropCounterSaleOrderDetail,
    };
    this.props.getDataWithParams(
      queryParams,
      HDCheckTotalAmount,
      "TotalAmountObj"
    );
    const TotalAmountObj: ICheckTotalAmount = d_TotalAmountObj;
    this.props.history.push({
      pathname: "home/checkout/",
      state: {
        restObj: restData,
        TotalAmountObj,
        myCart: this.state.myCart,
      },
    });
  };

  toggleDrawer = (isTrue) => {
    this.setState({ isOpenDr: isTrue });
  };
  minusMenuQty = (headId, menuId) => {
    const { actMenu: MenuItem } = this.getActive(headId, menuId);
    // 1. Make a shallow copy of the items
    let items = [...this.state.myCart];
    let itemIndex = items.findIndex(
      (obj: ImyCart) =>
        obj.ProPubStrMenuItemCode == menuId &&
        obj.MenuItem.PropPubMenuHeadCode == headId
    );
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[itemIndex] };
    // 3. Replace the property you're intested in
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
      items.splice(itemIndex, 1);
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
  };
  plusMenuQty = (headId, menuId) => {
    const { actMenu, actHead, actMod } = this.getActive(headId, menuId);

    if (actHead.PropPubModifierLinked === "1") {
      this.showMods(headId, menuId);
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
      this.setState({ myCart: items, cartTotal });
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
    debugger;
    const { actMenu: MenuItem, actHead, actMod } = this.getActive(hid, mid);
    //cart Item
    let cartItem = {
      ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
      ProPubIntQty: 1,
      ProPubIntMenuComboModifier: 0,
      ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
      ProPubIntSelectedRowIndex: this.state.myCart.length,
      ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
      ProPubStrPreModifierCode: "",
      PropPubRate: MenuItem.PropPubRate,
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
          ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
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
    let menuList2 = [...this.state.menuList2],
      menu2 = menuList2.find((obj) => obj.PropMenuItemCode === mid);
    menu2.menuQty ? (menu2.menuQty += 1) : (menu2.menuQty = 1);
    this.setState({
      ...this.state,
      myCart: [...this.state.myCart, saleItem],
      cartTotal,
      menuList2,
      checked: [],
    });
    this.toggleDrawer(false);
  };
  filterBy = (value) => {
    let { filter } = this.state;
    let isTrue = filter[value];
    let filteredList = this.state.MenuItemList;
    if (!isTrue)
      filteredList = this.props.restData.menuDetails.MenuItemList.filter(
        (menu: MenuItemList, i) => menu.PropPubVegNonVeg === "Veg"
      );

    this.setState({
      ...this.state,
      filter: { ...filter, [value]: !isTrue },
      MenuItemList: [...filteredList],
    });
  };
  searchMenu = (e) => {
    let { name, value } = e.target;
    let filteredList = this.props.restData.menuDetails.MenuItemList.filter(
      (menu: MenuItemList, i) => {
        let keyRegx = new RegExp(value, "i");
        let temp = menu.PropPubMenuItemDescription.search(keyRegx);
        return temp === -1 ? false : true;
      }
    );
    this.setState({ [name]: value, MenuItemList: [...filteredList] });
  };

  getActive(hid, mid) {
    const { restData } = this.props;
    const menuDetails: IMenuDetailsSingleApi = restData.menuDetails;
    const { MenuItemModifierList, MenuItemList } = menuDetails;
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
    const { MenuHeadList, MenuItemModifierList, MenuItemList } = menuDetails;
    return (
      <div className="tab-pane" id="order-online">
        <div className="restaurants-order-bg m-bottom">
          <div className="tab-header">
            <div className="row">
              <div className="col-12 col-md-4 offset-md-6">
                <TextField
                  label="search menu item"
                  id="standard-start-adornment"
                  onChange={this.searchMenu}
                  value={this.state.searchKey}
                  fullWidth
                  name="searchKey"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {" "}
                        <i className="fa fa-search text-muted"></i>{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-2">
                <div className="filter-box">
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
            </div>
          </div>
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
            <div className="tab-content meals">
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
                            {this.state.MenuItemList.map((item, j) => {
                              return (
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
                                    ></MealList>
                                  </div>
                                </div>
                              );
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
          <div id="tabs-cart-total">
            <div className="view-cart">
              <p>
                {" "}
                {this.state.myCart.length + " Items | "}{" "}
                <i className="rupee"></i>&nbsp;{this.state.cartTotal.toFixed(2)}{" "}
              </p>
              <p>( All prices are exclusive of Taxes.)</p>
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

          <FullScreenDialog
            heading="My Cart"
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
            ></MealList>
                      )
                    })
                  }
            </div>
            
            <div>
              {/* <table className="cart-data table table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myCart.length &&
                    this.state.myCart.map((item: ImyCart, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div>
                              <h4>
                                {" "}
                                {item.MenuItem.PropPubMenuItemDescription}{" "}
                              </h4>
                              <h5>
                                {" "}
                                <span className="rupee"></span> &nbsp;{" "}
                                {item.MenuItem.PropPubRate}{" "}
                              </h5>
                              <div>
                                {" "}
                                {item.addonList.map((add, j) => (
                                  <h5 key={j}>
                                    {" "}
                                    {add.ProPubStrItemDescription}{" "}
                                  </h5>
                                ))}{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="cartQty">
                              <Counter
                                count={item.ProPubIntQty}
                                upgrader={() => this.plusCartQty(i)}
                                degrader={() => this.minusCartQty(i)}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="rupee"></span>
                            <span> {item.PropPubRate.toFixed(2)} </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <b>SubTotal</b>{" "}
                    </th>
                    <th>
                      <b>
                        <span className="rupee"></span>{" "}
                        {this.state.cartTotal.toFixed(2)}
                      </b>
                    </th>
                    <th>
                      <Button color="primary" onClick={this.gotoCheck}>
                        {" "}
                        Order Now{" "}
                      </Button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            */}
            </div>
          </FullScreenDialog>
        </div>

        <ModsDrawer
          isOpenDr={this.state.isOpenDr}
          toggleDrawer={this.toggleDrawer}
          currentMod={this.state.currentMod}
          handleToggleMod={this.handleToggleMod}
          checked={this.state.checked}
          addMenuToCart={this.addMenuToCartWithAddon}
        ></ModsDrawer>
      </div>
    );
  }
  minusCartQty(i) {
    throw new Error("Method not implemented.");
  }
  plusCartQty(i: number) {
    throw new Error("Method not implemented.");
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
      dispatch(getDataWithTypeAction(queryParams, url, type, other)),
  };
};
export default compose<any, any>(
  withStyles(homeStyle),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(MealTab);
