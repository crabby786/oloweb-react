import React, { Component } from 'react'
import * as Redux from 'redux'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { withStyles, Grid, Icon, Paper, Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse, CircularProgress, Box } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { menuItem, tabData, IRestDetail } from '../Models/restDetailModel'
import FullWidthTabs from '../Components/tabs'
import { restDetailAction } from '../Store/Actions/restListAction'
import { imgBase } from '../Constants/DishCoApi'
import SwipeableViews from 'react-swipeable-views'

const DishSlider = (props: any) => {
  // const [index, setValue] = React.useState(0);
  const { RestaurantDishes, classes, index } = props


  return (
    <SwipeableViews axis="x" index={index} onChangeIndex={props.handleChangeCarouselIndex}>
      {RestaurantDishes.map((dish: any, i: number) => (
        <Card square key={i} className="slider-card" >
          <div
            className="card-header"
          >
                    <Typography component="div" style={{ color: '#fff' }}>
                      <h4 className="text-secondary">Signature Dishes</h4>
                      <Icon fontSize="small" className={clsx((dish.IsVeg == 1) ? classes.textSuccess : classes.textDanger, classes.iconWithText)} >fiber_manual_record</Icon>
                      {dish.RestaurantDishName}
                      
                    </Typography>
                    <div className="rupee rate"  >
                        {dish.Rate}
                        </div>
          </div>
          <CardMedia
            className={classes.media}
            image={imgBase + dish.DishImage}
            title="dish"
          />
          <CardActions disableSpacing className={classes.CardActions}>
            <Typography >
              by Locals
                </Typography>
            <Typography component="div">
              Voted By
                    <h5> {dish.Votes}</h5>
              Users
                </Typography  >
            <Typography component="div">
              <h5>{dish.Friends}</h5>
              <span className={classes.badgeOrange} >FRIENDS</span>
            </Typography>
            <Typography component="div">
              <h5>{0}</h5>
              <span className={classes.badgeOrange} >
                MARSHAL
                      </span>
            </Typography>
            <Typography variant="h6" component="div" align="center" className={classes.bgYellow} style={{
              padding: '0px 8px',
              margin: ' 0px 0px',
              fontSize: '13px',
            }} >
              # <br></br>
              Rank <br></br>
              Now
                </Typography>

          </CardActions>
        </Card>

      ))}
    </SwipeableViews>

  )
}

class RestDetails extends React.Component<any, any> {

  state: any = {
    expanded: false,
    index: 0
  }
  componentWillMount() {
    let IntLocRestaurantId = this.props.match.params.restid;
    const query = {
      IntLocRestaurantId,
    }
    const type = 'GETDETAIL';
    return this.props.getDetail(query, type);
  }
  handleChangeCarouselIndex = (index: number) => {
    this.setState({ index });
  };

  carouselByNavRight = (dishes: number) => {
    if ((dishes - 1) > this.state.index) { this.setState({ index: this.state.index + 1 }); }
    else {
      this.setState({ index: 0 });
    }
  };
  carouselByNavLeft = (dishes: number) => {
    if (this.state.index > 0) { this.setState({ index: this.state.index - 1 }); }
    else {
      this.setState({ index: (dishes - 1) });
    }
  };


  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { classes, match, restDetail } = this.props;
    const { isError, isLoading } = restDetail;
    const data: IRestDetail = restDetail.data;
    const { index } = this.state;
    const logoPlaceholder = '/assets/images/other/img/for_you.png'

    if (isLoading || data == null) {
      return (
        <div className="preLoader">
          <CircularProgress color="primary" />
        </div>
      )
    }
    else {
      return (
        <div>
          
            <Grid container justify="space-between" alignItems="center" wrap="nowrap" className="mt-2 p-1" >
              <Grid item xs={2} md={1}>
                <img src={data.RestaurantLogo == "" ? logoPlaceholder : imgBase + data.RestaurantLogo} style={{ maxWidth: '100%' }} alt="img" />
              </Grid>
              <Grid item >
                <h4> {data.RestaurantName} </h4>
                <small>
                  {data.TotalPledge} Meals Pledged
                                    </small>
              </Grid>
              <Grid item >
                <Typography component="div" align="center">
                  <div className="text-center" >
                    <Icon style={{ fontSize: '27px', color: '#ccc' }} > person_pin_circle </Icon>
                  </div>
                  <small>Check In</small>
                </Typography>
              </Grid>
            </Grid>




          {/* carousel starts */}
          <div className="carousel-root">
            <DishSlider RestaurantDishes={data.RestaurantDishes} handleChangeCarouselIndex={this.handleChangeCarouselIndex} classes={classes} index={this.state.index}></DishSlider>
            <div className="nav">
              <div className="left-nav" onClick={() => this.carouselByNavLeft(data.RestaurantDishes.length)}>
                <Icon>chevron_left</Icon>
              </div>
              <div className="right-nav" onClick={() => this.carouselByNavRight(data.RestaurantDishes.length)}>
                <Icon>chevron_right</Icon>
              </div>
            </div>
          </div>

          {/*_________ Menu Item ______*/}
          <div>
            <Grid container className={classes.menuContainer}>
              {data && data.RestaurantDetailMenuUser.map((opt, i) => (
                <Grid item xs={3} key={i} >
                  <div onClick={() => { console.log(opt.Uniqueid) }}>
                    <div className={classes.menuIcons} >
                      <img alt='menuIcon' className={classes.menuIcon} src={'/assets/images/other/img/' + opt.ImageName + '.png'}></img>
                    </div>
                    <small>{opt.Discription}</small>
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

          <Typography className={clsx(classes.coupenBox, classes.bgBrown)} component="div" paragraph variant="h5">
            Coupons From this Restaurant
                 </Typography>

          <div>
            <img src="/assets/images/other/img/get_coupons_hdpi.png" alt="get coupon" style={{ height: '75px' }}></img>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    restDetail: state.restDetailReducer
  }
}
function mapDispatchToProps(dispatch: any, ownProps: any) {

  return {
    getDetail: (query: any, type: any) => dispatch(restDetailAction(query, type))
  }
}

export default compose(
  withRouter,
  withStyles(detailStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(RestDetails);
