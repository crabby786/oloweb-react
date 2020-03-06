import React, { Fragment, PureComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Fade, Box, ListItemAvatar, Avatar, Grid, Typography, Divider } from "@material-ui/core";
import { imgBase } from "../Constants/DishCoApi";
import { restListAction, filterListAction } from "../Store/Actions/restListAction";
import LinearProgress from '@material-ui/core/LinearProgress';
import { groupBy, filterByKeyValue } from '../Store/Actions/gridActions';
import { ListPlaceHolder } from "./UiComps/ListPlaceHolder";
import clsx from "clsx";
import Marquee from "react-smooth-marquee"



class App extends React.Component<any, any> {
  // <div id="PostList" class="msglistbody" style="-webkit-overflow-scrolling: touch;"></div>
  state = {
    items: [],
    hasMore: true,
    groupedItems: [],
    FilteredItems: [],
    visibleItems: [],
    totalRestCount: 0,
    footerMsg: 'Thank You, List Ended Here',
    isMarquee: false
  };
  componentWillMount = () => {
    const { restData, query, url } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state, items: [...dishes], totalRestCount: restData.data.NoOfRestaurants.NoOfRestaurants
    })
  }
  componentWillReceiveProps(nextProps) {
    let { query, url, initialList, totalCount, restData, getRestList } = this.props;
    if (nextProps.query.IntLocOrderby !== query.IntLocOrderby || nextProps.url !== url) {
      getRestList(nextProps.query, nextProps.url)
        .then(obj => {
          let dishes = obj.payload.data.AllRestaurantDishes;
          let count = obj.payload.data.NoOfRestaurants.NoOfRestaurants;
          this.setState({ ...this.state, items: [...dishes], totalRestCount: count, hasMore: true, footerMsg: 'Thank You, List Ended Here' });
        });
    }
  }

  showDetails = (restId: number) => {
    const { history } = this.props;
    history.push("/home/restdetail/" + restId);
  };
  fetchMoreData = async () => {
    let { query, url, totalCount, restData } = this.props;
    let loadedItems = this.state.items.length;
    const { isError, status, statusText } = restData;
    if (loadedItems >= this.state.totalRestCount) {
      this.setState({ hasMore: false });
      return;
    }
    let params = { ...query, IntLocNoOfRecords: loadedItems }
    await this.props.getRestList(params, url);
    if (restData.data.AllRestaurantDishes !== null) {
      let dishes = restData.data.AllRestaurantDishes;
      this.setState({
        ...this.state,
        items: [...this.state.items, ...dishes]
      });
    }
    else {
      this.setState({ ...this.state, footerMsg: 'Sorry record not found', hasMore: false });
    }

  };

  render() {
    const { classesUp } = this.props
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
            {this.state.items.map((content: any, i) =>
              <div key={i} onClick={() => this.showDetails(content.RestaurantId)} style={{ width: '100%', maxWidth: '100vw', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                <Box alignItems="flex-start" display="flex">
                  <Box px={1}>
                    <span style={{ whiteSpace: "nowrap", fontSize: "small" }} >By Locals</span>
                    <ListItemAvatar>
                      <Avatar alt="dish1" variant="rounded"
                        src={imgBase + content.DishImage} imgProps={{ onError: (e: any) => e.target.src = '/assets/images/other/img/DishCo_49.png' }} >
                      </Avatar>
                    </ListItemAvatar>
                  </Box>
                  <Grid component="div" container spacing={1} wrap="nowrap" >
                    <Grid item  >
                      <Icon fontSize="small" className={clsx(content.DishType == 1 ? 'text-success' : 'text-danger')} >fiber_manual_record</Icon>
                    </Grid>
                    <Grid item>
                      <div className="dataContainer" >
                        <h5> {content.RestaurantDishName} </h5>
                        <h5 className="text-danger" >{'@ ' + content.RestaurantName} </h5 >
                        <h5> {content.LocationName} </h5>
                        <h5 className="Marquee">
                          <Marquee velocity = {0.06} className = "MarqueeContent" >{content.Cuisines} </Marquee>
                        </h5>
                        <Box mt={1}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item  >
                              <Icon fontSize="small" className={classesUp.iconWithText} >directions_walk</Icon>
                              <small> {content.Distance.toFixed(2)} </small>
                              <small>Km</small>
                            </Grid>
                            <Grid item>
                              <Icon fontSize="small" className={classesUp.iconWithText} >check_box</Icon>
                              <small> {content.Votes} </small>
                              <small>Votes</small>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
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
    getRestList: (queryParams: any, url) => dispatch(filterListAction(queryParams, url))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
