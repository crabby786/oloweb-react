import React from 'react';
import { Icon, Grid } from '@material-ui/core';
import {  withRouter } from "react-router-dom";
import { imgBase } from '../../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import FullScreenDialog from '../../Components/full_dialog';
import BookNow from './BookNow';
import BookLater from './BookLater';

const BookHistory = (props:any)=> {
  return(
    <div>BookHistory</div>
  )
}
const FutureReserve = (props:any)=> {
  return(
    <div>FutureReserve</div>
  )
}

class TableBook extends React.Component<any, any> {
  state = {
    items: [],
    isDialogeOpen:false,
    openedDialoge:{} as any
  };
  dialogs:any = {
    BookNow:{isOpen:false, heading:'Book Now', container:<BookNow />},
    BookLater:{isOpen:false, heading:'Book Later', container:<BookLater />},
    BookHistory:{isOpen:false, heading:'Booking History', container:<BookHistory />},
    FutureReserve:{isOpen:false, heading:'Future Reservation', container:<FutureReserve />},
  }
  componentDidMount = () => {
    const { restData } = this.props;
    let dishes = restData.data.AllRestaurantDishes;
    this.setState({
      ...this.state, items: [...dishes]
    });
    document.querySelectorAll('.box').forEach((item:any)=> item.addEventListener('click', this.handleOpenDialoge) )

  }

  showDetails = (restId: number) => {
    this.props.history.push("/home/restdetail/" + restId);
  }
  handleOpenDialoge = (event: any)=> {
    let container = event.currentTarget.id ;
    let currentDialoge = this.dialogs[container];
    this.setState({
      ...this.state, openedDialoge:currentDialoge,isDialogeOpen:true,
    })
  }
  closeDialoge = ()=> {
    this.setState({
      ...this.state, isDialogeOpen:false, openedDialoge:'', 
    })
  }
  render() {
    //   const {location} = this.props;
    const DialogChild = {

    }
    return (
      <div>
        <header className='home-header' >
          Book Table
        </header>
        <Grid container className='book-table-container'>
            <Grid xs={6} item  className=''>
                <div className='box' id="BookNow" >
                    <img src="/assets/images/icons/dashboard/best_dish.jpg" alt="Now" />
                    <h4 className="label">Eat Now</h4>
                </div>
            </Grid>
            <Grid xs={6} item  className=''>
                <div className='box' id="BookLater">
                    <img src="/assets/images/icons/dashboard/best_dish.jpg" alt="Now" />
                    <h4 className="label">Eat Later</h4>
                </div>
            </Grid>
            <Grid xs={6} item  className=''>
                <div className='box' id="BookHistory">
                    <img src="/assets/images/icons/dashboard/best_dish.jpg" alt="Now" />
                    <h4 className="label">Booking History</h4>
                </div>
            </Grid>
            <Grid xs={6} item  className=''>
                <div className='box' id="FutureReserve">
                    <img src="/assets/images/icons/dashboard/best_dish.jpg" alt="Now" />
                    <h4 className="label">Future Reservations</h4>
                </div>
            </Grid>
        
        </Grid>
        <FullScreenDialog heading = {this.state.openedDialoge.heading} dialogContent = { this.state.openedDialoge.container }  handleClose = { this.closeDialoge} isOpen={this.state.isDialogeOpen} >
          { this.state.openedDialoge.container}
        </FullScreenDialog>
        </div>
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
    // getRestList: (queryParams: any) => dispatch(restListAction(queryParams))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(TableBook);