import React, { Fragment, PureComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Fade } from "@material-ui/core";
import { imgBase } from "../Constants/DishCoApi";
import { restListAction, filterListAction } from "../Store/Actions/restListAction";
import LinearProgress from '@material-ui/core/LinearProgress';
import {groupBy, filterByKeyValue}from '../Store/Actions/gridActions';
import { ListPlaceHolder } from "./UiComps/ListPlaceHolder";



class App extends React.Component<any, any> {
  state = {
    items: [],
    hasMore: true, 
    groupedItems:[],
    FilteredItems:[],
    visibleItems:[],
    totalRestCount:0,
    footerMsg:'Thank You, List Ended Here'
  };
  
  componentWillMount = () => {
    const { restData,query, url } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state, items: [...dishes], totalRestCount:restData.data.NoOfRestaurants.NoOfRestaurants
    })
  }
  componentWillReceiveProps(nextProps){
    let {query, url,initialList, totalCount,restData,getRestList} = this.props;  
      if(nextProps.query.IntLocOrderby !== query.IntLocOrderby || nextProps.url !== url){
        getRestList(nextProps.query, nextProps.url)
        .then(obj=> {
          let dishes = obj.payload.data.AllRestaurantDishes;
        let count = obj.payload.data.NoOfRestaurants.NoOfRestaurants;
        this.setState({...this.state,items: [...dishes],totalRestCount:count, hasMore:true,footerMsg:'Thank You, List Ended Here'});
        });
    }    
  }

  fetchMoreData = async() => {
    let {query, url, totalCount,restData} = this.props;
    let loadedItems = this.state.items.length;
    const {isError,status, statusText } = restData;
    if (loadedItems >= this.state.totalRestCount ) {
      this.setState({ hasMore: false });
      return;
    }
    let params = { ...query, IntLocNoOfRecords:loadedItems}
    await this.props.getRestList(params,url);
    if(restData.data.AllRestaurantDishes !== null){
      let dishes = restData.data.AllRestaurantDishes;
      this.setState({...this.state,
        items: [...this.state.items,...dishes ]
      });
    }
    else {
      this.setState({...this.state, footerMsg:'Sorry record not found', hasMore:false});
    }
    
  };
  render() {
    return (
      <div>
          <div className="listType-1">
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<LinearProgress></LinearProgress>}
            height={'76vh'}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b> {this.state.footerMsg} </b>
              </p>
            }
          >
            {this.state.items.map((content:any, i) => 
              <div  className='listItem' style={{display:'flex', height:'70px'}} key={i}>   
                  <div><h4 className='p-1'> {content.DishRank} </h4></div>
                  <div className="list-avatar-container">
                    
                    <img src={imgBase + content.DishImage} alt='' />
                  </div>
                  <div className='pr-1'>
                    <Icon fontSize="small" className={true ? 'text-success' : 'text-error'} >
                      fiber_manual_record
                       </Icon>
                  </div>
                  <div className='content'>
                    <h4> {content.RestaurantDishName} </h4>
                    <h5 className='text-danger' >{content.RestaurantName}</h5>
                  </div>
                  
                </div>    
            )}
          </InfiniteScroll>
        </div>
        

        </div>
    );      
  }
}


const mapStateToProps = (state: any, ownProps: any) => {
  // console.log(state);
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams: any,url) => dispatch(filterListAction(queryParams,url))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
