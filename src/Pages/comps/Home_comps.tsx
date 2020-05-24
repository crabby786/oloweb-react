import React, { Component } from "react";

export class HowtoSection extends Component {
  render() {
    return (
      <section className="how-to-work">
  <div className="container">
    <div className="row">
        <div className="col-12">
            <h2 className= "text-center">How It Works ?</h2>
        </div>
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="work-item">
          <div className="work-img">
            <img src="/assets/images/home/img_1.svg" alt="" />
          </div>
          <div className="work-text">
            <h4>Choose Your Nearest Restaurant</h4>
            <p>
              Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
              tempus condimentum.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="work-item">
          <div className="work-img">
            <img src="/assets/images/home/img_2.svg" alt="" />
          </div>
          <div className="work-text">
            <h4>Choose Food</h4>
            <p>
              Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
              tempus condimentum.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="work-item">
          <div className="work-img">
            <img src="/assets/images/home/img_3.svg" alt="" />
          </div>
          <div className="work-text">
            <h4>Get Delivery</h4>
            <p>
              Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
              tempus condimentum.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  }
}