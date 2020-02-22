import React, { Component } from 'react'
import * as Redux from 'redux'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, CircularProgress,  } from '@material-ui/core'
import { detailStyle } from '../../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter, Link } from 'react-router-dom'
import { getMerchantListAction } from '../../Store/Actions/restListAction'
import { imgBase } from '../../Constants/DishCoApi'
import {  IAccountList } from '../../Models/MerchantListModel';


class MerchantList extends React.Component<any, any> {

  componentDidMount() {
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
    const { classes, match, merchantList, history } = this.props;
    const { isError, isLoading, data } = merchantList;
    const logoPlaceholder = '/assets/images/other/img/for_you.png'
    if(isLoading || data == null ) {
      return (<div className="preLoader">
        <CircularProgress color="primary" />
      </div>)
    }
    else if(data.StatusCode == 0 ){ 
      const accountList:IAccountList[] = data.AccountList;

      return (
          <div className="listType-1">
            <div className="bg-mute  text-center font-weight-bold header">
              Select Account
            </div>
            <div className="list">
            {accountList.map((list:any, i:number)=> {
              return (

            <Link key ={i} to={ match.url + "/" + list.AccountId} className="listItem">
            <div className="img-box" >
                <img src={list.Logo ==""? logoPlaceholder : imgBase + list.Logo} alt="account logo" ></img>
            </div>
            <div className="data-container" >
                <h5> {list.AccountName} </h5>
                <small className='text-danger' >
                    {'@' + list.LocationName}
                </small>
            </div>
        </Link>
              )
            }            
             )}
            </div>
            <div className="bg-mute  text-center font-weight-bold mob-footer" onClick={()=> history.goBack() } >
              Cancel
            </div>
            {/* <SubAccountList></SubAccountList> */}
          </div>
         )
    }
    else {
      return (
        <div>No Record Found</div>
      )
    }
    
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    merchantList: state.getMerchantListReducer
  }
}
function mapDispatchToProps(dispatch: any, ownProps: any) {

  return {
    getList: (query: any, type: any) => dispatch(getMerchantListAction(query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(MerchantList);
