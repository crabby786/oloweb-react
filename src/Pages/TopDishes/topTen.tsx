import React from 'react';
import { Icon } from '@material-ui/core';
import {  withRouter, Link } from "react-router-dom";
import { imgBase } from '../../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';


class TopTenList extends React.Component<any, any> {
  state = {
    items: [],
    total: 0,
    loaded: 0
  };
  componentDidMount = () => {
    const { restData } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state, items: [...dishes]
    })
  }

  showDetails = (restId: number) => {
    this.props.history.push("/home/restdetail/" + restId);
  }
  render() {
    return (
      <div>
        <header className='home-header' >
          My Top 10 Dishes
        <span className='float-right'> <Icon > share </Icon> </span>
        </header>
        <div className='listType-1'>
          <div className="list">
          {this.state.items.length && this.state.items.map((obj, i: number) => (            
              <div className='listItem' >
                <h2 className="align-self-center pr-2"> #{1} </h2>
                <div className="list-avatar-container">
                  <img src={`${imgBase}DG2109-53920252-ff9c-4ba5-a06e-6dfc3e0fd150`} alt='' />
                </div>
                {true ? <>
                  <div className='pr-1'>
                <Icon fontSize="small" className={true ? 'text-success' : 'text-error'} >
                  fiber_manual_record
                </Icon>
              </div>
              <div className='content'>
                <h4> {'Dish Name'} </h4>
                <h5 className='text-danger' >{'Rest Name'}</h5>
              </div>
           
                </> : <>
                <p style={{flexGrow:2}} className='pl-2' >No Favourite Yet!</p>
                <Link to='/search' className='py-2 px-1 bg-warning text-center inset-4' >
                    <h2>#</h2>
                    <h5>Rank Now</h5>
                </Link>
                </> }
               </div>
          ))}
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // getRestList: (queryParams) => dispatch(restListAction(queryParams))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(TopTenList);