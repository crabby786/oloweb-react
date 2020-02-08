import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { RestList } from '../Components/lists';
import Icon from '@material-ui/core/Icon';
import { SwitchA } from '../Components/FormComps';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { homeStyle } from '../Styles/jss/homePageStyles'
import { Typography } from '@material-ui/core';

// export interface Iprops extends WithStyles<typeof homeStyle> { };
class Restaurants extends React.Component<any, any> {
  state:any = {
    TouristSwitch:true,
    distanceSwitch:true,
  }
  handleSwitchChange = (name: string) => (event:any) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  setAppbarOpen = (isOpen: boolean) => {
    this.setState({ ...this.state, appBarOpen: isOpen })
  }
  render() {
    const { classes, restData } = this.props;
    
    
    return (
          <div>
            <Grid component="div" container justify="space-between" alignItems="center" spacing={1}>
              <Grid item>
                <SwitchA
                  leftKey="Rank"
                  rightKey="Distance"
                  checked={this.state.DistanceSwitch}
                  handleSwitchChange={this.handleSwitchChange('DistanceSwitch')}                  
                  switchValue="DistanceSwitch"
                />
              </Grid>
              <Grid item>
                <Icon>search</Icon>
              </Grid>
              <Grid item>
                <SwitchA
                  leftKey="Local"
                  rightKey="Tourist"
                  checked={this.state.TouristSwitch}
                  handleSwitchChange={this.handleSwitchChange('TouristSwitch')}
                  switchValue="TouristSwitch"
                />
              </Grid>
            </Grid>
            <div>
              {
                restData ? < RestList classesUp = {classes} restData={restData.AllRestaurantDishes} /> 
                  : (<div  className="preLoade">
      </div>)
              }
            </div>
          </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}
export default compose<any, any>(
  withStyles(homeStyle),
  connect(null, mapDispatchToProps),
)(Restaurants);