import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RestaurantCards extends Component {
  render() {
    return (
      <section className="order-food-online">		
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="new-heading">
						<h1> Order Food Online In Your Area </h1>
					</div>
					<div className="your-location">
						<span><i className="fa fa-map-marker-alt"></i>Navi Mumbai</span>Change Location
					</div>
					<div className="all-items">
						<div className="search col-lg-4 col-md-6 col-sm-12 col-xs-12">
							<form>
								<input className="search-location" name="search" type="search" placeholder="Enter Your Location" />
								<div className="icon-btn">
									<div className="cross-icon">
									<i className="fa fa-crosshairs"></i>
									</div>
									<div className="s-m-btn">
										<button className="search-meal-btn btn-link">Search</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-1.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-1.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Bonn Burgur</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Rooster</a></h5>
								<p>$5.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-2.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-2.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Two Burgurs</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Chef House</a></h5>
								<p>$5.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-3.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-3.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Large Cheese Pizza...</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Limon Resto</a></h5>
								<p>$12.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-4.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-4.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Hakka Noodles</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Ledbery</a></h5>
								<p>$5.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-5.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-5.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Cappuccino Coffee</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Organice cafe</a></h5>
								<p>$5.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-6.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-6.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Choclate Cake</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Chef House</a></h5>
								<p>$8.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-7.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-7.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html"> Indian Dosa </a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Indian Resto</a></h5>
								<p>$10.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
					<div className="all-meal">
						<div className="top">
							<a href="meal_detail.html"><div className="bg-gradient"></div></a>
							<div className="top-img">
								<img src="assets/images/meals/img-8.jpg" alt="" />
							</div>
							<div className="logo-img">
								<img src="assets/images/meals/logo-8.jpg" alt="" />
							</div>
							<div className="top-text">
								<div className="heading"><h4><a href="meal_detail.html">Double Tikki Burgur</a></h4></div>
								<div className="sub-heading">
								<h5><a href="restaurant_detail.html">Rooster</a></h5>
								<p>$5.00</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div className="bottom-text">
								<div className="delivery"><i className="fa fa-shopping-cart"></i>Delivery Free : Free</div>
								<div className="time"><i className="far fa-clock"></i>Delivery Time : 30 Min</div>
								<div className="star">
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>								
									<span>4.5</span> 
									<div className="comments"><a href="#"><i className="fa fa-comment-alt"></i>05</a></div>
								</div>								
							</div>
						</div>
					</div>					
				</div>
			</div>
			<div className="meal-btn">
				<a href="#" className="m-btn btn-link">Show All</a>
			</div>
		</div>
	</section>
    );
  }
}
