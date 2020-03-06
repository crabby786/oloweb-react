import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestList from '../Components/lists3';
import Icon from '@material-ui/core/Icon';
import { SwitchA } from '../Components/FormComps';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { homeStyle } from '../Styles/jss/homePageStyles'
import { InputBase, Button, GridList, GridListTile, RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';
import FullScreenDialog from '../Components/full_dialog';
import VerticalTabs from '../Components/UiComps/VerticalTabs';
import { filterListAction } from '../Store/Actions/restListAction';
import { TouristDishesRankWiseFilter_Api, extractQuery, BaseApi } from '../Constants/DishCoApi';

// export interface Iprops extends WithStyles<typeof homeStyle> { };
class Restaurants extends React.Component<any, any> {
  state: any = {
    TouristSwitch: true,
    distanceSwitch: true,
    isDialogeOpen: false,
    sortByRankDistance: 'distance',
    sortByLocalTourist: 'local',
    listUrl: 'RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter',
    initialList:[],
    queryParams: {
      StrLocLocationName1: "",
      IntLocAvgMealRate: 0,
      IntLocCustomerId: 21257,
      StrLocDishName: "",
      StrLocLatitude: "19.032204151153564",
      StrLocLongitude: "73.01880598068237",
      StrLocCreditCardType: "",
      StrLocLocationName: "",
      StrLocCountryName: "",
      StrLocCuisines: "",
      StrLocCityName: "Navi Mumbai",
      StrLocIsFacilitieIds: "",
      IntLocLastAdevrtisementId: 0,
      IntLocOrderby: 2,
      DecimalLocTime: "",
      StrLocRestaurantName: "",
      IntLocNoOfRecords: 0,
    },
    totalRestCount: 0
  }
  handleSwitchChange = (name: string) => (event: any) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  setAppbarOpen = (isOpen: boolean) => {
    this.setState({ ...this.state, appBarOpen: isOpen })
  }

  handleOpenDialoge = (event: any) => {
    this.setState({
      ...this.state, isDialogeOpen: true,
    })
  }
  closeDialoge = () => {
    this.setState({
      ...this.state, isDialogeOpen: false,
    })
  }
  handleChangeFilterList = (event, value: string, useFunction?: boolean) => {
    const { sortByRankDistance, sortByLocalTourist } = this.state;
    const { filterList } = this.props;
    //if event.currentTarget.name cannot get use useFunction
    let radioName = useFunction ? event : event.currentTarget.name
    
    this.setState((prev,prop) => {
      prev = { ...prev, [radioName]: value, };
      ;
      switch (prev.sortByLocalTourist) {
        case 'local':
          prev.listUrl = `RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter`;
          if (prev.sortByRankDistance == 'rank')
            {prev.queryParams = { ...prev.queryParams, IntLocOrderby:1};}
            else {prev.queryParams = { ...prev.queryParams, IntLocOrderby:2};}
          break;
        case 'tourist':
          prev.listUrl = `AllTouristDishesRankWiseFilter/GetFunPubAllTouristDishesRankWiseFilter`;
          if (prev.sortByRankDistance == 'rank')
            {prev.queryParams = { ...prev.queryParams,IntLocOrderby:1 };}
            else {prev.queryParams = { ...prev.queryParams,IntLocOrderby:2 };}
          break;

        default:
          prev.listUrl = `RestaurantDetailsByFilter/GetFunPubRestaurantDetailsByFilter`
          break;
      }
      // filterList(prev.queryParams, prev.listUrl)
      // prev.initialList = [prop.restData.data.AllRestaurantDishes ]
      return {...prev};
    });
  };

  removeFilter = (key: string,value:string) => {
    this.handleChangeFilterList(key, value, true);
  }

  render() {
    const { classes, restData } = this.props;
    
    return (
      <div>
        {/* <Grid component="div" className="p-2 mt-2" container justify="space-between" alignItems="center" >
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
        </Grid> */}

        <div>
          <div className="filter-container">
            <div className={classes.searchControl}>
              <div className={classes.searchIcon}>
                <Icon children="search" />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className='hr-list' >
              <Button variant="outlined" onClick={this.handleOpenDialoge} size="small" disableRipple endIcon={<span className="btn-badge">{this.state.filterApplied}</span>} color="primary" style={{ marginLeft: 0 }}> Filter</Button>
              <Button variant="outlined" size="small" disableRipple disabled={this.state.sortByRankDistance == 'distance'} endIcon={this.state.sortByRankDistance == 'rank' && <Icon onClick={(e) => this.removeFilter('sortByRankDistance', 'distance')} name="sortByRankDistance">close</Icon>} > Rank</Button>
              <Button disabled={this.state.sortByLocalTourist == 'local'} variant="outlined" size="small" disableRipple  endIcon={this.state.sortByLocalTourist == 'tourist' && <Icon onClick={(e) => this.removeFilter('sortByLocalTourist', 'local')} >close</Icon>} > Tourist</Button>
              <Button variant="outlined" size="small" disableRipple disabled endIcon={<Icon>close</Icon>} > Filter</Button>
              <Button variant="outlined" size="small" disableRipple disabled endIcon={<Icon>close</Icon>} > Rank</Button>
              <Button variant="outlined" size="small" disableRipple disabled endIcon={<Icon>close</Icon>} > Distance</Button>
              <Button variant="outlined" size="small" disableRipple disabled endIcon={<Icon>close</Icon>} > Local</Button>
              <Button variant="outlined" size="small" disableRipple disabled endIcon={<Icon>close</Icon>} > Tourist</Button>
            </div>
            <div>
            </div>
          </div>
          <RestList classesUp={classes} query={this.state.queryParams} totalCount={this.state.totalRestCount} url={this.state.listUrl}  />
          {/* <RestList  />  */}
          <FullScreenDialog semiFull heading={'Sort and Filters'} headerColor='default' dialogContent={<div></div>} handleClose={this.closeDialoge} isOpen={this.state.isDialogeOpen} noGutter>
            <div id="filterTabContainer">
              <VerticalTabs >
                <div id="sort-container">
                  <FormControl component="fieldset" >
                    <RadioGroup aria-label="rankDistance" row name="sortByRankDistance" value={this.state.sortByRankDistance} onChange={this.handleChangeFilterList}>
                      <FormControlLabel value="rank" control={<Radio />} label="Rank" />
                      <FormControlLabel value="distance" control={<Radio />} label="Distance" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component="fieldset" >
                    <RadioGroup aria-label="localTourist" row name="sortByLocalTourist" value={this.state.sortByLocalTourist} onChange={this.handleChangeFilterList}>
                      <FormControlLabel value="local" control={<Radio />} label="Local" />
                      <FormControlLabel value="tourist" control={<Radio />} label="Tourist" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>Tab2 data</div>
              </VerticalTabs>
            </div>
          </FullScreenDialog>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    filterList: (query, url) => dispatch(filterListAction(query, url))
  }
}
export default compose<any, any>(
  withStyles(homeStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(Restaurants);