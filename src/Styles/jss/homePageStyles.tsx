import { withStyles, Theme, createStyles, WithStyles, fade,  makeStyles  } from '@material-ui/core/styles';
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
          paddingRight: '16px', // keep right padding when drawer closed
          background:palette.error.main
        },
        toolbarIcon: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          background:theme.palette.error.main,
          ...theme.mixins.toolbar,
          '& .MuiIconButton-root':{color:'#fff'}
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
          [theme.breakpoints.up('md')]: {
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

        searchControl: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: fade(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
          },
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
          },
        },
        searchIcon: {
          width: theme.spacing(7),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color:'#999'
        },
        inputRoot: {
          color: 'inherit',
          width:'100%'
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 7),
          transition: theme.transitions.create('width'),
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          [theme.breakpoints.up('md')]: {
            width: 120,
            '&:focus': {
              width: 200,
            },
          },
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
          paddingTop: 0,
          paddingBottom: 0,
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
          verticalAlign: 'middle'
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      }
  ) 
  }