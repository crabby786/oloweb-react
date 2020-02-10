import React, { Component } from 'react'
import * as Redux from 'redux'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, Grid, Icon, Paper, Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse, CircularProgress, Box } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter, Link } from 'react-router-dom'
import { menuItem, tabData, IRestDetail } from '../Models/restDetailModel'
import FullWidthTabs from '../Components/tabs'
import { restDetailAction } from '../Store/Actions/restListAction'
import { imgBase } from '../Constants/DishCoApi'
import SwipeableViews from 'react-swipeable-views'
import { IMerchantList } from '../Models/MerchantListModel'


class MerchantList extends React.Component<any, any> {

  state: any = {
  }
  componentWillMount() {
    // let IntLocRestaurantId = this.props.match.params.restid;
    let IntLocFlag = 1;
    let IntLocCustomerId = 8;
    const query = {
        IntLocFlag,IntLocCustomerId
    }
    const type = 'GETMERCHANTLIST';
    return this.props.getList(query, type);
  }
  render() {
    // const { classes, match, merchantList } = this.props;
    // const { isError, isLoading } = merchantList;
    // const data: IMerchantList = merchantList.data;
    const logoPlaceholder = '/assets/images/other/img/for_you.png'
    // if (!isLoading && !isError && data != null) { window.location.hash
      if(true) {
      return (
          <div className="merchantListContainer">
            <Link to="/" className="listItem">
                <div className="img-box" >
                    <img src={logoPlaceholder} alt="merchant" ></img>
                </div>
                <div className="data-container" >
                    <h5>name of reest</h5>
                    <small className='text-danger' >
                        @ Location
                    </small>
                </div>
            </Link>
          </div>
         )
    }
    
    else {
      return (<div className="preLoader">
        <CircularProgress color="primary" />
      </div>)
    }
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    merchantList: state.restDetailReducer
  }
}
function mapDispatchToProps(dispatch: any, ownProps: any) {

  return {
    getList: (query: any, type: any) => dispatch(restDetailAction(query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(MerchantList);
