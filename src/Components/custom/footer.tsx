import React, { Component } from "react";
import { NavRoutes } from "../../routes";
import { Link } from "react-router-dom";
import { imgBase } from "../../Constants/DishCoApi";
import six_degree from "../../img/six_degree.png";

export default class FooterSection extends Component<any,any> {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className=" col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <div className="pt-5">
                <img
                  src={imgBase + this.props.StrRestaurantLogo + ".jpg"}
                  alt="logo"
                  style = {{maxHeight:'60px'}}
                />
              </div>
              <ul className="list-unstyled links">
                <li>
                  <div className="d-in-block">
                    <i className="fa fa-phone"></i>&nbsp;+91 2303 2717 
                  </div>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>&nbsp; mail@services.com
                </li>
                {/* <li>
                  Follow us on:&nbsp;{" "}
              <div className="social-btns">
                <a href="#">
                  <div className="social-btn soc-btn">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                </a>
                <a href="#">
                  <div className="social-btn soc-btn">
                    <i className="fab fa-twitter"></i>
                  </div>
                </a>
                <a href="#">
                  <div className="social-btn soc-btn">
                    <i className="fab fa-instagram"></i>
                  </div>
                </a>
                <a href="#">
                  <div className="social-btn soc-btn">
                    <i className="fab fa-youtube"></i>
                  </div>
                </a>
              </div>
            </li> */}
            </ul>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="link-title">
                <h4>About Us</h4>
                <ul className="links">
                  <li>
                  <a  target = "_blank" href="https://www.kahospitality.com/about/overview">
                  about us  </a>
                  </li>
                  <li>
                  <a  target = "_blank" href="https://www.kahospitality.com/contact-us">
                    contact us
                  </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="link-title">
                <h4>Privacy</h4>
                <ul className="links">
                  <li>
                    <Link to="/"> Terms & Conditions </Link>
                  </li>
                  <li>
                    <Link to="/"> Privacy Policy </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="copyright-text">
                  &copy; Copyright {new Date().getFullYear()}
                  <a href="#"> KA Hospitality</a> All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
