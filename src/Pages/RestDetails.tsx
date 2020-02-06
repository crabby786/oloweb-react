import React, { Component } from 'react'
import * as Redux from 'redux'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, Grid, Icon, Paper, Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { menuItem, tabData, IRestDetail } from '../Models/restDetailModel'
import FullWidthTabs from '../Components/tabs'
import { restDetailAction } from '../Store/Actions/restListAction'
import { imgBase } from '../Constants/DishCoApi'

class RestDetails extends React.Component<any, any> {

  state: any = {
    expanded: false,
  }
  componentWillMount() {
    let IntLocRestaurantId = this.props.match.params.restid;
    const query = {
      IntLocRestaurantId,
    }
    const type = 'GETDETAIL';
    return this.props.getDetail(query, type);
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { classes, match, restDetail } = this.props;
    const {isError, isLoading} = restDetail;
    const data:IRestDetail = restDetail.data;
    if (!isLoading && !isError && data != null ) {

      return(
          <div>
            <Paper className={classes.paper} square>
              <Grid container justify="space-between"  >
              <Grid item xs={2}>
                <img src={imgBase + data.RestaurantDishes[0].DishImage} style={{width:'100%'}} alt="img"/>
              </Grid>
                <Grid item >
                  <h3> {data.RestaurantName} </h3>
                  <small>
                    {data.TotalPledge} Meals Pledged
                                    </small>
                </Grid>
                <Grid item >
                  <Typography component="div" align="center">
                    <Icon style={{ fontSize: '27px', color: '#ccc' }} > person_pin_circle </Icon>
                    <br />
                    <small>Check In</small>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Card square>
              <CardHeader
                title="Signature Dishes"
                subheader={
                  <span>
                    <Icon fontSize="small" className={clsx((data.RestaurantDishes[0].IsVeg == 1) ? classes.textSuccess : classes.textDanger, classes.iconWithText)} >fiber_manual_record</Icon>
                    {data.RestaurantDishes[0].RestaurantDishName}
                  </span>
                }
                className={classes.cardHeader}
              />
              <CardMedia
                className={classes.media}
                image="/assets/images/other/dish1.jpg"
                title="dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
              </CardContent>
              <CardActions disableSpacing className={classes.CardActions}>
                <Typography >
                  by Locals
            </Typography>
                <Typography component="div">
                  Voted By
                <h4> {data.RestaurantDishes[0].Votes}</h4>
                  Users
            </Typography  >
                <Typography component="div">
                  <h4>{data.RestaurantDishes[0].Friends}</h4>
                  <span className={classes.badgeOrange} >FRIENDS</span>
                </Typography>
                <Typography component="div">
                  <h4>{0}</h4>
                  <span className={classes.badgeOrange} >
                    MARSHAL
                  </span>
                </Typography>
                <Typography variant="h6" component="div" align="center" className={classes.bgYellow} style={{
                  padding: '6px 8px',
                  margin: ' 0px 0px',
                  fontSize: '13px',
                }} >
                  # <br></br>
                  Rank <br></br>
                  Now
            </Typography>
    
              </CardActions>
            </Card>
            {/*_________ Menu Item ______*/}
            <div>
              <Grid container className={classes.menuContainer}>
                {menuItem && menuItem.map((opt, i) => (
                  <Grid item xs={3} key={i} >
                    <div >
                      <h4 className={classes.textBrown} >
                        <Icon>{opt.icon}</Icon>
                      </h4>
                      <small>{opt.name}</small>
                    </div>
                  </Grid>
                )
                )}
              </Grid>
            </div>
    
            {/* Tab Panel__________ */}
            <div>
              {data &&
                <FullWidthTabs tabData={tabData} classes={classes} content={data} />
              }
            </div>
    
            <Typography className={clsx(classes.coupenBox, classes.bgBrown)} component="div" paragraph variant="h6">
              Coupons From this Restaurant
                 </Typography>
            <Typography className={clsx(classes.coupenBox2, classes.bgBrown)} component="div" paragraph variant="h6">
              Coupons From this Restaurant
                 </Typography>
           
          </div>
        )
    }
    else {
      return(<div>Loading...</div>)
    }
  }
}

function mapStateToProps (state: any, ownProps: any) {
  return { 
    restDetail:state.restDetailReducer
  }
}
function mapDispatchToProps (dispatch: any, ownProps: any) {

  return {
    getDetail: (query: any, type: any) => dispatch(restDetailAction(query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(RestDetails);
