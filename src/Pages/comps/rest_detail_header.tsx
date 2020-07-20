import React from 'react';
import { imgBase } from '../../Constants/DishCoApi';
import { IconButton,Button } from '@material-ui/core';

export class RestHeader extends React.Component <any,any> {

    render() {
        return (
            <div className="resto-dt">
                    <div className="resto-detail">

                      <div className="resto-picy">
                      <img src={imgBase + this.props.selectedRest.RestaurantLogo} alt="rest logo" />
                      </div>
                      <div className="name-location">
                      <h1> {this.props.selectedRest.RestaurantName} </h1>
                        <p>
                          <span>
                            <i className="fas fa-map-marker-alt" />
                          </span>
                          {this.props.selectedRest.City }
                        </p>
                      </div>
                      
                    </div>
                  </div>
        );
    }
}