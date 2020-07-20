import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Icon,
} from "@material-ui/core";
import { getDataWithTypeAction } from "../Store/Actions/restListAction";
import { compose } from "recompose";
import { connect } from "react-redux";
import { imgBase } from "../Constants/DishCoApi";
import { IhomeDetails } from "../Models/RestListModel";
import six_degree from "../img/six_degree.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerContainer: {
      flexGrow: 1,
    },
    drawerList: {},
    pcMenu: {
      "& .MuiList-root": {
        display: "flex",
      },
      "& .MuiListItemIcon-root": {
        minWidth: 28,
        color: "inherit",
      },
    },
  })
);


function TopNav(props) {
  const { container,restData } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      {/* <div className={classes.toolbar} />
      <Divider /> */}
      <List className={classes.drawerList}>
      <ListItem component="a" href="/">
            <Icon className="MuiListItemIcon">home</Icon>
            <ListItemText primary="Home" />
          </ListItem>
      <ListItem component="a" target = "_blank" href="#">
            <Icon className="MuiListItemIcon">games</Icon>
            <ListItemText primary="About Us" />
          </ListItem>
          
      <ListItem component="a" target = "_blank" href="#">
            <Icon className="MuiListItemIcon">perm_phone_msg</Icon>
            <ListItemText primary="Contact" />
          </ListItem>
      </List>
    </div>
  );
  const homeDetails:IhomeDetails = restData.homeDetails;
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Hidden smUp implementation="css">
          <Toolbar className="bg-primary">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              id="hamburger1"
            >
              <MenuIcon />
            </IconButton>
            <div className="nav-brand">
            OloWeb
            </div>
            
          </Toolbar>
        </Hidden>
        {/* pc menu */}
        <Hidden xsDown implementation="css">
          <Toolbar className="pcMenu">
            <div className="nav-brand">
              <img
                className="pc-logo"
                // src={six_degree}
                src={imgBase + homeDetails.StrRestaurantLogo + '.jpg'}
                alt="logo"
              />
            </div>
            {drawer}
          </Toolbar>
        </Hidden>
      </AppBar>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* mobile menu */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div style={{marginBottom:'2em'}}>
  <div className="top">
    <a href="#">
      <div className="bg-gradient" />
    </a>
    <div className="top-img">
      <img src="/assets/images/meals/img-4.jpg"  />
    </div>
    <div className="logo-img">
      <img
        src={imgBase + homeDetails.StrRestaurantLogo + '.jpg'}
        className="side-image"
      />
    </div>
    </div>
            </div>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    restData: state.restListReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type)),
  };
};
export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(TopNav);
