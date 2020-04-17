import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { restListAction, filterListAction } from '../Store/Actions/restListAction';
import { homeStyle } from '../Styles/jss/homePageStyles';
import { MainListItems } from '../Components/sidebarItems';
import { Divider, List, Hidden, CircularProgress, Badge, Menu, MenuItem } from '@material-ui/core';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { HomeRoutes } from '../routes';
import MoreIcon from '@material-ui/icons/MoreVert';
import { extractQuery } from '../Constants/DishCoApi';


// const drawerWidth = 240;
// export interface Iprops extends WithStyles<typeof homeStyle> { };
declare global {
  interface Window {
      ReactNativeWebView:any
 }
}

class HomePage extends React.Component<any, any> {
  state: any = {
    appBarOpen: true,
    MobileMoreAnchorEl:null,
    AnchorEl:null,
    isMenuOpen:false,
    isMobileMenuOpen :false,
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
  }
  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
     this.setState ({ ...this.state, MobileMoreAnchorEl:event.currentTarget, isMobileMenuOpen:true});
  };
  componentDidMount() {
    let queryParams = {}
    let api  = extractQuery('RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter?StrLocChannelCode=001&IntLocCustomerId=21257&StrLocCityName=Navi+Mumbai&IntLocLastAdevrtisementId=0&IntLocAvgMealRate=0&IntLocOrderby=2&StrLocLatitude=19.1110512&StrLocLongitude=73.0153251&IntLocNoOfRecords=0');
    queryParams = {...api.queryParams};
    let url = api.url;
    this.props.getRestList(this.state.queryParams, url);
  }

  setAppbarOpen = (isOpen: boolean) => {
    this.setState({ ...this.state, appBarOpen: isOpen })
  }
   handleMobileMenuClose = () => {
    this.setState({ ...this.state, MobileMoreAnchorEl:null, isMobileMenuOpen:false})
  };
  handleMenuClose = () => {
    this.setState({ ...this.state, AnchorEl:null,isMenuOpen:false})
    // this.handleMobileMenuClose();
  };
  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
     this.setState({ ...this.state, AnchorEl:event.currentTarget, isMenuOpen:true});
  };
 menuId = 'primary-search-account-menu';
mobileMenuId = 'primary-search-account-menu-mobile';

handleLogout = ()=> {
  let dataForNative = {
    logOut : true
  }
  if(window.ReactNativeWebView )
  window.ReactNativeWebView.postMessage(JSON.stringify(dataForNative));
}
 
  render() {
    const { classes, restData, match } = this.props;
    const {path, url, isExact, params} = match;

    return (
      <div className={classes.root}>
        
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.appBarOpen && classes.appBarShift)}>
          <Toolbar className={clsx(classes.toolbar)}>

            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.setAppbarOpen(true)}
              className={clsx(classes.menuButton, this.state.appBarOpen && classes.menuButtonHidden)}>
              <Icon>menu</Icon>
            </IconButton>
              { this.props.history.location.pathname  == '/home' ?
              <IconButton color="inherit"  >
               <Icon>search</Icon> 
              </IconButton>  : 
              <IconButton color="inherit" onClick = { () =>  this.props.history.goBack() }  >
               <Icon >arrow_back</Icon> 
               </IconButton>
              }
            <Box className={clsx(classes.title)} style={{ textAlign: 'center' }} >
              <div>
                <span id="city" >Navi Mumbai</span>
                <Icon className={clsx(classes.iconWithText)}>pin_drop</Icon>
              </div>
              <div style={{ color: "#000" }} >
                { restData.data &&
                  <span id="restCount"> {restData.data.NoOfRestaurants !== null ?restData.data.NoOfRestaurants.NoOfRestaurants : 0} </span>
                } Restraurants
                </div>
            </Box>
            
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new emails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Icon>email</Icon>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notificationss" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Icon>notifications</Icon>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <Icon> account_circle </Icon>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

          
            </Toolbar>
        </AppBar>
        {/* {this.RenderMobileMenu} */}
        <Menu
    anchorEl={this.state.MobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={this.mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={this.state.isMobileMenuOpen}
    onClose={this.handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton aria-label="show 4 new emails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <Icon>email</Icon>
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton aria-label="show 11 new notificationss" color="inherit">
        <Badge badgeContent={11} color="secondary">
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>
      <p>notifications</p>
    </MenuItem>
    <MenuItem onClick={this.handleProfileMenuOpen}>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <Icon>account_circle</Icon>
      </IconButton>
      <p>Profile</p>
    </MenuItem>
    <MenuItem onClick={this.handleLogout}>
    <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <Icon>exit_to_app</Icon>
      </IconButton>
      <p>Logout</p>
    </MenuItem>
  </Menu>

      {/* {this.renderMenu} */}
      <Menu
    anchorEl={ this.state.AnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={this.menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={this.state.isMenuOpen}
    onClose={this.handleMenuClose}
  >
    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    
  </Menu>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.appBarOpen && classes.drawerPaperClose),
              root: classes.drawerRoot,
            }}
            open={this.state.appBarOpen}
          >
            <div className={classes.toolbarIcon}>
              <div>
                <img src="/assets/images/other/img/demo_logo.png" alt="logo" style={{height:'60px', width: '100%'}} ></img>
              </div>
              <IconButton onClick={() => this.setAppbarOpen(false)}>
                
                <Icon>menu_open</Icon>
              </IconButton>
            </div>
            <Divider />
            <List  >
              <MainListItems match={match}></MainListItems>
            </List>
          </Drawer>
        </Hidden>

        {restData.isLoading ? <div className="preLoader">
          <CircularProgress color="primary" />
        </div> :
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div >
              {
                (this.props.restData && this.props.restData.data != null ) ?
                <Switch>
                {HomeRoutes.map((route, i)=> (
                    <Route key={'homeroute' +i} path={ path + route.path}  component={route.component} ></Route>
                ) )}
              </Switch>
              : <div className="preLoader">
              <CircularProgress color="primary" />
            </div>
              }
            </div>
          </main>
        }
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps:any) => {
  // console.log(ownProps);
// console.log(state);
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams:any, url) => dispatch(filterListAction(queryParams,url))
  }
}
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);