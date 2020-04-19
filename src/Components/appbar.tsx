import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { NavRoutes } from '../routes';
import { Icon } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
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
        flexGrow:1
    },
    drawerList: {},
    pcMenu: {
        '& .MuiList-root': {
            display:'flex'
        },
        '& .MuiListItemIcon-root': {
            minWidth :28,
            color:'inherit'
        }
    },
  }),
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: any;
}

export default function TopNav(props: ResponsiveDrawerProps) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <div className={classes.drawerContainer} >
      {/* <div className={classes.toolbar} />
      <Divider /> */}
      <List className = {classes.drawerList} >
        {NavRoutes.map((route, i) => (
          <ListItem button key={i}>
            <Icon className = 'MuiListItemIcon' >{route.icon}</Icon> 
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      
    </div>
  );

  return (
    <div >
      <AppBar  position="fixed" className={classes.appBar}>
      <Hidden smUp implementation="css">
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Olo Web
          </Typography>
        </Toolbar>
        </Hidden>
         {/* pc menu */}
         <Hidden xsDown implementation="css">
        <Toolbar className='pcMenu'>
            <div className= 'logo-container'>
                <img className= 'pc-logo' src="/assets/images/other/img/demo_logo.png" alt="logo"/>
            </div>
            {drawer}
        </Toolbar>
        </Hidden>
      </AppBar>
      <nav  aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* mobile menu */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div>
                <img className= 'side-image' src="/assets/images/other/img/restImg.jpg" alt="restraunt"/>
            </div>
            {drawer}
          </Drawer>
        </Hidden>
       
      </nav>
      </div>
  );
}
