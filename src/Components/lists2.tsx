import React, { useRef, useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import {  makeStyles,  ListItemAvatar, Avatar, Grid, Icon, Divider, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import { IRestList, IAllRestaurantDish } from '../Models/RestListModel';
import { useHistory, withRouter } from "react-router-dom";
import { imgBase } from '../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { restListAction } from '../Store/Actions/restListAction';
import InfiniteScroll from "react-infinite-scroll-component";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

 function ExampleWrapper(props:any) {
  const {
    hasNextPage,
    isNextPageLoading,
    items,
    loadNextPage
  }= props;
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  
    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index:number) => !hasNextPage || index < items.length;
  
    // Render an item or a loading indicator.
    const Item = ({ index, style }:any) => {
      let content;
      if (!isItemLoaded(index)) {
        content = "Loading...";
      } else {
        content = items[index];
      }
  
      return <div style={style}>
        <div style={{display:'flex'}}>
          <div style={{backgroundImage:"url(https://foodmarshal.blob.core.windows.net/fmstorage/DG2109-53920252-ff9c-4ba5-a06e-6dfc3e0fd150)",width:'60px', height:'60px', backgroundSize:'contain'}} > </div>
          <div> {content.RestaurantName} </div>
        </div>
      </div>;
    };
  
    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={800}
            itemCount={itemCount}
            itemSize={60}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={'100%'}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    );
  }
class RestList extends React.Component<any, any> {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: []
  };
  componentWillMount() {
    this.setState({...this.state, items:[...this.props.restData.data.AllRestaurantDishes]})
  }
   showDetails =  (restId:number) => {
    this.props.history.push("/home/restdetail/"+ restId );
  }
  _loadNextPage = (...args:any) => {
    // console.log("loadNextPage", ...args);
    
    this.setState({ isNextPageLoading: true }, async() => {
      let queryParams = { IntLocNoOfRecords: this.state.items.length}
        await this.props.getRestList(queryParams);
        const dishes: any[] = this.props.restData.data.AllRestaurantDishes;
      this.setState((state:any) => ({
        hasNextPage: state.items.length < this.props.restData.data.NoOfRestaurants.NoOfRestaurants,
        isNextPageLoading: false,
        items: [...state.items, ...dishes]
      }));
    });
  };
  render() {
    const { hasNextPage, isNextPageLoading, items } = this.state;

    return (
      <div>

        <ExampleWrapper
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          loadNextPage={this._loadNextPage}
        />
      </div>
    );
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