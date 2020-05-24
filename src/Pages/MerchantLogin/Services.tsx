import React from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, CircularProgress, Typography, Grid } from '@material-ui/core'
import { detailStyle } from '../../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter, Link } from 'react-router-dom'
import { getDataAction } from '../../Store/Actions/restListAction'
import { ISubAccount} from '../../Models/MerchantListModel'

class RestaurantServices extends React.Component<any, any> {

  
  render() {
    const { classes, match, subAccountList } = this.props;
    const { isLoading, data } = subAccountList;
    if(isLoading || data === null ) {
      return (<div className="preLoader">
        <CircularProgress color="primary" />
      </div>)
    }
    else { 
        let AccountId = match.params.RestaurantId; 
        
      const account:ISubAccount = data.find((obj) => obj.RestaurantId === AccountId );
      const ServicesRights = account.ServicesRights.split(',');

      return (
        <div className={classes.dashboardContainer}>
          <div className="bg-danger header text-center" >
              <div>
              <h5 className="text-light mb-1" > {account.RestaurantName} </h5>
              <small> {account.Location} </small>
              </div>
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

function mapStateToProps(state) {
  return {
    subAccountList: state.SubAccountListReducer
  }
}
function mapDispatchToProps(dispatch) {

  return {
    getList: (url,query, type) => dispatch(getDataAction(url, query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(RestaurantServices);