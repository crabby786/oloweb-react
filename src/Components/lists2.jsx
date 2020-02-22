import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class RestList extends React.Component {
  state = {
    items: [],
    hasMore: true,
    total: 0,
    loaded: 0
  };
  componentDidMount() {
    this.fetchMoreData();
  }
  fetchMoreData = async () => {
    const { items, hasMore, total, loaded } = this.state;
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    let api = `https://fmprod.dishco.com/shawmanservices/api/RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter?StrLocChannelCode=001&IntLocCustomerId=21257&StrLocCityName=Navi+Mumbai&IntLocLastAdevrtisementId=0&IntLocAvgMealRate=0&IntLocOrderby=2&StrLocLatitude=19.1110512&StrLocLongitude=73.0153251&IntLocNoOfRecords=${loaded}`;
    let data = await fetch(api, {
      headers: {
        AndroidPhone: "EV6FTlgBhOalM+qjJpr2OZpAEpPkYJHC5I1aOWyeLevwSIpuzyKEAg=="
      }
    });
    data = await data.json();
    let dishes = data.AllRestaurantDishes;
    this.setState({
      items: [...this.state.items, ...dishes],
      loaded: this.state.loaded + 30
    });
  };

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => (
            <div
              style={{ width: "100%", height: 60, display: "flex" }}
              key={index}
            >
              <div>
                <img
                  style={{ width: "60px" }}
                  alt=""
                  src={`https://foodmarshal.blob.core.windows.net/fmstorage/${
                    i.DishImage
                  }`}
                />
              </div>
              <div>{i.RestaurantName}</div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default RestList;