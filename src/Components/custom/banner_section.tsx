import React, { Component } from "react";
import "../../Styles/css/style1.css";
import { getLocationAction } from "../../Store/Actions/helperAction";

export default class BannerSection extends Component {
  
  getLocation = (event) => {
      getLocationAction().then(position => console.log(position))
      .catch((err) => {
        console.error(err.message);
      });
  };
  render() {
    return (
      <section className="block-preview">
        <div className="cover-banner"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="left-text-b">
                <h1 className="title">Choose, Order and Checkout</h1>
                <h6 className="exeption">
                  Specify your address to suggest you the fast delivery
                </h6>
                <p>Get our services from 24 hours.</p>
                <a className="bnr-btn  btn-primary" href="#">
                  Go To Meal
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <form>
							<div className="form-box">
								<div className="input-group-prepend">
								  <div className="input-group-text">
                                  <i className="material-icons " > person_pin_circle </i>
                                  </div>
								</div>
								<input className="find-address skills" name="search" type="text" placeholder="Choose your location" />
								<div className="input-group-prepend">
								  <div className="input-group-text-1"><i className="material-icons " > restaurant </i>
                                  </div>
								</div>
								<input className="find-resto skills" name="search" type="text" placeholder="Choose restaurant" />
								<button className="search-btn btn-primary" onClick= { this.getLocation } type="button">Find Restraunt</button>
							</div>
						</form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
