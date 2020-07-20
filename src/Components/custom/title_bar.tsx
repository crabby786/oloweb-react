import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {
  heading:string,
  routes
}

export default class TitleBar extends Component<any, Props> {
  render() {
    return (
      <section className="title-bar">
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="left-title-text">
					<h3> {this.props.heading} </h3>
					</div>
				</div>
				<div className="col-md-6">
					<div className="right-title-text">  
						<ul>
              { this.props.routes.map((obj, i) => (
              <li key = {i} className="breadcrumb-item active" > {obj.name} </li>
              )) }
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
    )
  }
}
