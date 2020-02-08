import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { List, makeStyles, Box, ListItemAvatar, Avatar, Grid, Icon, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { IRestList, IAllRestaurantDish } from '../Models/RestListModel';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { imgBase } from '../Constants/DishCoApi';

type Props =  RouteComponentProps;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: "small" ,
    marginTop:0,
    '& h4': {
      marginTop:0,
    },
    '& p': {
      // color:theme.palette.grey[500],
      marginTop:0,
      marginBottom:"0px",
      fontSize:"0.8rem"
    },
    '& h5': {
      marginTop:0,
      marginBottom:"0px"
    }
  },
  inline: {
    display: 'inline',
  },
  MuiDividerInset : {
    marginLeft:0
  },
  error : {
    color:theme.palette.error.main,
  },
  success : {
    color:theme.palette.success.main,
  }
  
}));
export const RestList = (props:any)=> {
  const {restData, classesUp} = props;  
  const classes = useStyles();
  let history = useHistory();
  const showDetails =  (restId:number) => {
    history.push("/restdetail/"+ restId );
  };
  return (
    <List className={classes.root}>
    {restData !== undefined &&  restData.map((obj:IAllRestaurantDish,i:number )=> (
        <div key={i} onClick={()=>showDetails(obj.RestaurantId)} >
        <ListItem alignItems="flex-start" disableGutters>
          <Box px={1}>
          <span style={{whiteSpace:"nowrap", fontSize:"small"}} >By Locals</span>
          <ListItemAvatar>            
          <Avatar alt="dish1" variant="square" 
           src={ imgBase + obj.DishImage}/>
        </ListItemAvatar>
          </Box>
          <Grid component="div" container spacing={1} wrap = "nowrap" >
      <Grid item  >
      <Icon fontSize="small"  className={clsx(obj.DishType == 1 ? classes.success:classes.error) } >fiber_manual_record</Icon>
      
        </Grid>
      <Grid item>
        <div className="dataContainer" >
        <h5> {obj.RestaurantDishName} </h5>
              <Typography color="error" >{'@ ' + obj.RestaurantName} </Typography >
              <h5> {obj.LocationName} </h5>
              <Typography className="text-muted" > {obj.Cuisines} </Typography>
              <Box mt={2}>
                <Grid container spacing={1}  alignItems="center">
                  <Grid item  >
                    <Icon fontSize="small" className={classesUp.iconWithText} >directions_walk</Icon>
                    <small> {obj.Distance.toFixed(2)} </small>
                    <small>Km</small>
                  </Grid>
                  <Grid item>
                    <Icon fontSize="small" className={classesUp.iconWithText} >check_box</Icon>
                    <small> {obj.Votes} </small>
                    <small>Votes</small>
                  </Grid>
                </Grid>
              </Box>
        </div>      
      </Grid>
        </Grid>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
        </div>
    ) )    }
 </List>

  )
}