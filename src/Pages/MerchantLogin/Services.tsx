import React, { Component } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, CircularProgress, Typography, Grid } from '@material-ui/core'
import { detailStyle } from '../../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { getDataAction } from '../../Store/Actions/restListAction'
import { imgBase } from '../../Constants/DishCoApi'
import { ISubAccount} from '../../Models/MerchantListModel'

import {GetRestaurantLoginDetails_Api} from '../../Constants/DishCoApi'
class RestrauntServices extends React.Component<any, any> {

  
  render() {
    const { classes, match, subAccountList, history } = this.props;
    const { isError, isLoading, data } = subAccountList;
    const logoPlaceholder = '/assets/images/other/img/for_you.png';
    if(isLoading || data == null ) {
      return (<div className="preLoader">
        <CircularProgress color="primary" />
      </div>)
    }
    else { 
        let AccountId = match.params.RestaurantId; 
        
      const account:ISubAccount = data.find((obj:any) => obj.RestaurantId == AccountId );
      const ServicesRights = account.ServicesRights.split(',');

      return (
        <div className={classes.dashboardContainer}>
          <div className="bg-danger p-2 mb-3 text-center " >
              <h5 className="text-light" > {account.RestaurantName} </h5>
              <small> {account.Location} </small>
          </div>
        <Grid container spacing={1}>
            {ServicesRights.map((menu, i)=> (
                <Grid item xs={4} md={4} key={i} >
                    <Link to={ match.url} className={clsx("menu-box", classes.imgBox)} >
                        <img src='/assets/images/icons/dashboard/pledge.jpg' alt="meni item"></img>
                        <Typography component="div" variant="caption" className="mt-2" > {menu} </Typography>
                    </Link>
                </Grid>
            ) )}                

            </Grid>    
    </div>

          )
    }
    
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    subAccountList: state.SubAccountListReducer
  }
}
function mapDispatchToProps(dispatch: any, ownProps: any) {

  return {
    getList: (url:any,query: any, type: any) => dispatch(getDataAction(url, query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(RestrauntServices);