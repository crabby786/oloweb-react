import React, { Fragment, PureComponent } from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Fade } from "@material-ui/core";
import { imgBase } from "../Constants/DishCoApi";
import { restListAction } from "../Store/Actions/restListAction";
import { ListPlaceHolder } from "./UiComps/ListPlaceHolder";



function ExampleWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style,isScrolling }) => {
    let content;
    
    if (!isItemLoaded(index)) {
      return (<h1> 
        ...loading
        {/* <ListPlaceHolder Height="106px"/> */}
         </h1>);
      
    } else {
      content = items[index];
      return (
        <div style={style} className='listItem' >   
        {isScrolling ? < ListPlaceHolder Height="100%" className="list-skeleton" />:  <>
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
            </>
            }    
          </div>
        
      )
    }
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref}) => (


        <div className='listType-1'>
          <FixedSizeList
            className="list"
            height={800}
            itemCount={itemCount}
            itemSize={70}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={'100%'}
            useIsScrolling           >            
            {/* {Item} */}
          </FixedSizeList>
        </div>
      )}
    </InfiniteLoader>
  );
}


class App extends React.Component<any, any> {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: []
  };
  componentWillMount = () => {
    const { restData } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state, items: [...dishes]
    })
  }

  _loadNextPage = async (...args) => {
    const { restData, getRestList } = this.props;
    this.setState({ isNextPageLoading: true }, async() => {

    let dishes = restData.data.AllRestaurantDishes;
    let counter = this.state.items.length;
    await getRestList(counter);

      this.setState(state => ({
        hasNextPage: state.items.length < 1000,
        isNextPageLoading: false,
        items: [...state.items, ...dishes]
      }));

    });
  };

  render() {
    const { hasNextPage, isNextPageLoading, items } = this.state;

    return (
      <Fragment>
        <ExampleWrapper
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          loadNextPage={this._loadNextPage}
        />
      </Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRestList: (queryParams) => dispatch(restListAction(queryParams))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
