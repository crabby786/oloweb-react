import React, { useRef, useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { List, makeStyles,  ListItemAvatar, Avatar, Grid, Icon, Divider, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import { IRestList, IAllRestaurantDish } from '../../Models/RestListModel';
import { useHistory, withRouter } from "react-router-dom";
import { imgBase } from '../../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { restListAction } from '../../Store/Actions/restListAction';
import InfiniteScroll from "react-infinite-scroll-component";


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
        // loader={<div className="bottom-loader"><LinearProgress /></div>}
        loader={<div >Loading...</div>}
        height={'100vh'}
        style={{margin:0, padding:0}}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {this.state.items.map((obj:IAllRestaurantDish, index) => (
          <div key={index} onClick={() => this.showDetails(obj.RestaurantId)} style={{ width: '100%', height: 110,borderBottom:'1px solid #ccc',overflow:'hidden' }}>
            <div style={{alignItems:"flex-start" ,display:"flex"}}>
              <div style={{padding:'8px'}}>
                <span style={{ whiteSpace: "nowrap", fontSize: "small" }} >By Locals</span>
                <div className='list-avatar-container' >
                  <img alt="" 
                    src={imgBase + obj.DishImage} />
                    </div>
              </div>
              <div className="d-flex nowrap p-2"  >
                <div  >
                  <Icon fontSize="small" className={clsx(obj.DishType == 1 ? 'text-success' : 'text-danger')} >fiber_manual_record</Icon>

                </div>
                <div>
                  <div className="dataContainer" >
                    <h5> {obj.RestaurantDishName} </h5>
                    <p className='text-danger' >{'@ ' + obj.RestaurantName} </p>
                    <h5> {obj.LocationName} </h5>
                    <p className="text-muted" style={{ whiteSpace: "nowrap", fontSize: "small",width:'220px',textOverflow:'ellipsis' }}  > {obj.Cuisines} </p>
                    <div className='mt2'>
                      <div className='d-flex align-center'>
                        <div  >
                          <Icon fontSize="small" className={'iconWithText'} >directions_walk</Icon>
                          <small> {obj.Distance.toFixed(2)} </small>
                          <small>Km</small>
                        </div>
                        <div>
                          <Icon fontSize="small" className={'iconWithText'} >check_div</Icon>
                          <small> {obj.Votes} </small>
                          <small>Votes</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>            
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