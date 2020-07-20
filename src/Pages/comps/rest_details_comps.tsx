import React,{useState} from 'react'
import { Fade, Button, Drawer, List, ListItem, ListItemIcon, Checkbox, ListItemText, TextField, InputAdornment } from '@material-ui/core';
import { Counter } from '../../Components/FormComps';
import { MenuItemList } from '../../Models/restDetailModel';

export const MealList = (props) => (
    <div className="meal-list">
      <ul className="list-unstyled">
        <li className="meal-list-item p-md-2 py-2">
          <div className="meal-img-box">
            <Fade in timeout={500} >
            <img
              src={props.item.PropPubImagePath}
              className="img-fluid meal-img"
              alt=""
            />
            </Fade>
            <i
              className={props.item.PropPubVegNonVeg == "Veg" ? "veg" : "non veg"}
            ></i>
          </div>
          <div className="caption-meal">
            <h4>{props.item.PropPubMenuItemDescription}</h4>
            {!props.isCart && 
              <h5 className="description">{props.item.PropPubMenuItemlineDescription}</h5>
            }
            
            <p className="item-rate">
              <i className="rupee"></i>
              {" " + props.item.PropPubRate}{" "}
            </p>
            <div>
                  { props.cart && props.cart.addonList ? props.cart.addonList.map((add, j) => (
                    <span key={j}>
                      {" "}
                      {add.ProPubStrItemDescription}{", "}
                    </span>
                  )) : ""}
                </div>
          </div>
          {props.flavourCode !== 1 && 
            <div className="add-control Qty align-self-center">
            {props.item.Qty || props.isCart ? (
              <Counter
                upgrader={() => props.cartId >= 0 ?
                  props.plusMenuQty(
                    props.item.PropPubMenuHeadCode,
                    props.item.PropMenuItemCode,
                    props.cartId
                  ):
                  props.plusMenuQty(
                    props.item.PropPubMenuHeadCode,
                    props.item.PropMenuItemCode
                  )
                }
                degrader={() => props.cartId >= 0?
                  props.minusMenuQty(
                    props.item.PropPubMenuHeadCode,
                    props.item.PropMenuItemCode,
                    props.cartId 
                  ) :
                  props.minusMenuQty(
                    props.item.PropPubMenuHeadCode,
                    props.item.PropMenuItemCode
                  )
                }
                count={ props.cart ? props.cart.ProPubIntQty : props.item.Qty}
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
            {props.isCart && <h5 className="mt-2 text-center">
              <i className="rupee"></i>{" "}
              { props.cart.addonPrice ? props.cart.PropPubPrice + props.cart.addonPrice : props.cart.PropPubPrice }
            </h5>}
          </div>
          }
        </li>
      </ul>
    </div>
  );

export const ModsDrawer = (props) => {
    let menu: MenuItemList = props.currentMod.menu,
      Modifier = props.currentMod.Modifier,
      mealPrice = props.currentMod.mealPrice;
  
    return (
      <Drawer
        PaperProps={{ style: { maxHeight: "50vh" } }}
        anchor="bottom"
        open={props.isOpenDr}
        onClose={() => props.toggleDrawer(false)}
      >
        <header className="border-bottom p-2 px-3 ">
        <i
            className="fa fa-close float-right"
            onClick={() =>
                props.toggleDrawer(false)
            }
            />
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
        <div className="border-top p-2">
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                props.addMenuToCartWithAddon(props.currentMod.hid, props.currentMod.mid)
              }
              color="primary"
              className="float-right"
            >
              {`Add - `}
              <span className="rupee"></span>
              {mealPrice && mealPrice.toFixed(2)}
            </Button>
          </div>
          
      </Drawer>
    );
  };
export const TableDrawer = (props) => {
  const {isOpenDr,toggleDrawer,title,handleSubmit,data} = props;
  const [tbl, setTbl] = useState('');
  const [errorObj, setErrorObj] = useState({tbl:''});
  const  handleTableChange =(e)=> {
    let {name, value}= e.target;
    setTbl(value)
  }
    return (
      <Drawer
        PaperProps={{ style: { maxHeight: "50vh" } }}
        anchor="bottom"
        open={isOpenDr}
        onClose={() => toggleDrawer(false)}
        className="tbl-drawer"
      >
        <header className="border-bottom p-2 px-3 ">
        <i className="fa fa-times float-right"
            onClick={() => toggleDrawer(false)}
            />
         <h3>{title}</h3>
            {props.subTitle && <h4 className="text-muted">
                {props.subTitle}
            </h4>}
        </header>
        <div className="content">
              <div>
              <TextField
                      variant="outlined"
                      name="tbl"
                      label="Table Number"
                      value={tbl}
                      error={errorObj.tbl !== ""}
                      helperText={errorObj.tbl}
                      onChange={handleTableChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fas fa-mobile-alt " />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{}}
                    />
                  {!data.isValidTbl &&   <span className="text-danger"> Table number {tbl} not found </span> }
              </div>
        </div>
        <div className="dr-footer">
          <Button variant="contained" onClick={() =>handleSubmit(tbl)} color="primary" className='btn-xs-block' >Submit</Button>
        </div>
      </Drawer>
    );
  };

