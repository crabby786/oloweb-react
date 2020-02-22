import React, { useRef, useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { List, makeStyles, Box, ListItemAvatar, Avatar, Grid, Icon, Divider, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import { IRestList, IAllRestaurantDish } from '../Models/RestListModel';
import { useHistory, withRouter } from "react-router-dom";
import { imgBase } from '../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { restListAction } from '../Store/Actions/restListAction';
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: "small",
    marginTop: 0,
    '& h4': {
      marginTop: 0,
    },
    '& p': {
      // color:theme.palette.grey[500],
      marginTop: 0,
      marginBottom: "0px",
      fontSize: "0.8rem"
    },
    '& h5': {
      marginTop: 0,
      marginBottom: "0px"
    }
  },
  inline: {
    display: 'inline',
  },
  MuiDividerInset: {
    marginLeft: 0
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  }

}));

class RestList extends React.Component<any, any> {
  state = {
    items: [],
    hasMore: true,
    total: 0,
    loaded: 0
  };
  componentDidMount= ()=> {
    const { restData } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state,items:[...dishes]
    })
  }
  // static getDerivedStateFromProps(props: any, state: any) {}
  
   showDetails =  (restId:number) => {
    this.props.history.push("/home/restdetail/"+ restId );
  }
  fetchMoreData = async () => {
    const { items, hasMore, total, loaded } = this.state;
    const { restData } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      items: [...this.state.items, ...dishes],
      loaded: this.state.loaded + 30
    });
    if (this.state.items.length >= restData.data.NoOfRestaurants.NoOfRestaurants) {
      this.setState({ hasMore: false });
      return;
    }
    let query = {IntLocNoOfRecords:loaded}
    this.props.getRestList(query)
  };
  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        loader={<div className="bottom-loader"><LinearProgress /></div>}
        height={'82vh'}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {this.state.items.map((obj:IAllRestaurantDish, index) => (
          <div key={index} onClick={() => this.showDetails(obj.RestaurantId)} style={{ width: '100%', height: 110, overflow:'hidden' }}>
            <Box alignItems="flex-start" display="flex">
              <Box px={1}>
                <span style={{ whiteSpace: "nowrap", fontSize: "small" }} >By Locals</span>
                <ListItemAvatar>
                  <Avatar alt="dish1" variant="square"
                    src={imgBase + obj.DishImage} />
                </ListItemAvatar>
              </Box>
              <Grid component="div" container spacing={1} wrap="nowrap" >
                <Grid item  >
                  <Icon fontSize="small" className={clsx(obj.DishType == 1 ? 'text-success' : 'text-danger')} >fiber_manual_record</Icon>

                </Grid>
                <Grid item>
                  <div className="dataContainer" >
                    <h5> {obj.RestaurantDishName} </h5>
                    <Typography color="error" >{'@ ' + obj.RestaurantName} </Typography >
                    <h5> {obj.LocationName} </h5>
                    <Typography className="text-muted" style={{ whiteSpace: "nowrap", fontSize: "small",width:'220px',textOverflow:'ellipsis' }}  > {obj.Cuisines} </Typography>
                    <Box mt={2}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item  >
                          <Icon fontSize="small" className={'iconWithText'} >directions_walk</Icon>
                          <small> {obj.Distance.toFixed(2)} </small>
                          <small>Km</small>
                        </Grid>
                        <Grid item>
                          <Icon fontSize="small" className={'iconWithText'} >check_box</Icon>
                          <small> {obj.Votes} </small>
                          <small>Votes</small>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="fullWidth" component="div" />
          </div>
        ))
        }
      </InfiniteScroll>

    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams: any) => dispatch(restListAction(queryParams))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(RestList);