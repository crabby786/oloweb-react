import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { restListAction } from '../Store/Actions/restListAction';
import { homeStyle } from '../Styles/jss/homePageStyles';
import { MainListItems, secondaryListItems } from '../Components/sidebarItems';
import { Divider, List, Hidden, CircularProgress } from '@material-ui/core';
import RestDetails from './RestDetails';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Restraunts from './Restraunts';
import Dashboard from './Dashboard';
import MerchantList from './MerchantList';
import { HomeRoutes } from '../routes';


// const drawerWidth = 240;
// export interface Iprops extends WithStyles<typeof homeStyle> { };
class HomePage extends React.Component<any, any> {
  state: any = {
    appBarOpen: true,
  }
  componentWillMount() {
    this.props.getRestList();
  }

  setAppbarOpen = (isOpen: boolean) => {
    this.setState({ ...this.state, appBarOpen: isOpen })
  }
  render() {
    const { classes, restData, match } = this.props;
    const {path, url, isExact, params} = match;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.appBarOpen && classes.appBarShift)}>
          <Toolbar className={clsx(classes.toolbar)}>

            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.setAppbarOpen(true)}
              className={clsx(classes.menuButton, this.state.appBarOpen && classes.menuButtonHidden)}>
              <Icon>menu</Icon>
            </IconButton>
            <IconButton color="inherit"  >
              <Icon>search</Icon>
            </IconButton>
            <Box className={clsx(classes.title)} style={{ textAlign: 'center' }} >
              <div>
                <span id="city" >Navi Mumbai</span>
                <Icon className={clsx(classes.iconWithText)}>pin_drop</Icon>
              </div>
              <div style={{ color: "#000" }} >
                <span id="restCount">1617</span> Restraurants
                </div>
            </Box>
            <IconButton color="inherit">
              <img src="/assets/images/other/img/pledge_logo.png" alt="logo2" style={{ height: '30px' }}></img>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.appBarOpen && classes.drawerPaperClose),
              root: classes.drawerRoot,
            }}
            open={this.state.appBarOpen}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={() => this.setAppbarOpen(false)}>
                
                <Icon>menu_open</Icon>
              </IconButton>
            </div>
            <Divider />
            <List  >
              <MainListItems></MainListItems>
            </List>
          </Drawer>
        </Hidden>

        {restData.isLoading ? <div className="preLoader">
          <CircularProgress color="primary" />
        </div> :
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {
                (this.props.restData && this.props.restData.data != null ) ?
                <Switch>
                {HomeRoutes.map((route, i)=> (
                    <Route key={'homeroute' +i} path={path + route.path} exact={route.exact} component={route.component}></Route>
                ) )}
              </Switch>
              : <div className="preLoader">
              <CircularProgress color="primary" />
            </div>
              }
            </Container>
          </main>
        }
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps:any) => {
  // console.log(ownProps);

  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: () => dispatch(restListAction())
  }
}
export default compose(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);