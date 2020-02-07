import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import * as mainStyle from './main'

const drawerWidth = 240;
export const homeStyle = (theme: Theme) => 
  {
    const {palette, typography} = theme;
    return createStyles(
      {
        root: {
          display: 'flex',
          '& .MuiAvatar-root' :{width:'60px', height:'60px'},
          '& .MuiListItem-root' :{cursor: 'pointer'},
        },
        toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
          background:palette.error.main
        },
        toolbarIcon: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          background:theme.palette.error.main,
          ...theme.mixins.toolbar,
        },
        appBar: {
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
        appBarShift: {
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          [theme.breakpoints.up('sm')]: {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: drawerWidth,
            },
        },
        menuButton: {
          marginRight: 36,
        },
        menuButtonHidden: {
          display: 'none',
        },
        title: {
          flexGrow: 1,
        },
        drawerPaper: {
          position: 'relative',
          whiteSpace: 'nowrap',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          [theme.breakpoints.up('sm')]:{
            
              width:drawerWidth,
              flexShrink: 0,
              '& .navItem' : {
                textDecoration:'none',
                color:palette.primary.main,
                '& .MuiListItemIcon-root':{color:'inherit'}
              },
              '& .active.navItem .MuiButtonBase-root': {
                background: palette.primary.main,
                color: palette.primary.contrastText,
                
              }
          }
        },
        drawerRoot:{height:'100%'},
        drawerPaperClose: {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        },
        appBarSpacer : {...theme.mixins.toolbar } ,
        content: {
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        },
        container: {
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          [theme.breakpoints.down('xs')]:{
            paddingLeft: 0,
          paddingRight: 0,
          }
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
        iconWithText: {
          lineHeight: '1.25'
        },
      }
  ) 
  }