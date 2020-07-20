import React from 'react'
import { Button } from '@material-ui/core';
import { connect } from "react-redux";
// import { d_InsertOrderDetails } from "../Constants/dummy";
import { IrestData } from '../Models/RestListModel';
import { Link } from 'react-router-dom';

 function ThanksPage(props) {
     const restData:IrestData = props
     const orderDetails = restData.insertOrderDetails;
    return (
        <section className="bill-slip">			
		<div className="container">					
			<div className="row justify-content-center">
				<div className="col-lg-6 col-md-6 col-12">
					<div className="bill-container">
						<div className="new-heading">
							<h1> Thank you so much for you order</h1>
							<p>I really appreciate it!</p>
						</div>
						<div className="discount-text">
							<p> You order with {'Cafe sanchit Goa'} has been successfully placed  </p>
							{/* <p> You order with {restData.restObj.RestaurantName} has been successfully placed  </p> */}
						</div>
						<div className="slip-detail">
							<div className="slip-left">
								<p>Order No</p>
							</div>
							<div className="slip-right">
								<p> {orderDetails.MessageCode} </p>
							</div>
						</div>
						<div className="">
                            <Button color="primary" variant="contained" className= 'mr-3' component={Link} to='/'> Place New Order </Button>
                            <Button color="primary" variant="contained" href={restData.homeDetails.StrRestaurantContactUs}  > Contact </Button>
                        </div>

					</div>
				</div>
			</div>							
		</div>
	</section>
    )
}
const mapStateToProps = (state) => {
    return {
      restData: state.restListReducer,
    };
  };
export default connect(mapStateToProps, null)(ThanksPage);