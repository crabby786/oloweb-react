import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useSelector } from 'react-redux'
import { IRestList,RestaurantDeliveryList } from "../../Models/RestListModel";
import { Link } from "react-router-dom";
import { imgBase } from "../../Constants/OloApi";

// initialState = {}
// const restData = useSelector((state:any) => state.restListReducer, )
//let obj= {BrowsePlaces,PopularRests, FeaturedRests,FavRecipe}

const useStyles = makeStyles({
  bottomRoot: {
    width: '100%',
    justifyContent: 'space-between',
    boxShadow: '0 -1px 3px #525252',
    // padding: '6px 0',
    height: '56px',
    '& .MuiBottomNavigationAction-wrapper': {
      '& img': { maxHeight: '30px', maxWidth: '30px', width: '26%', height: '26%', marginBottom: '0' },
      '& .MuiBottomNavigationAction-label': {},
    },
    
  },
});

export class HowtoSection extends Component {
  render() {
    return (
      <section className="how-to-work">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">How It Works ?</h2>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="work-item">
                <div className="work-img">
                  <img src="/assets/images/home/img_1.svg" alt="" />
                </div>
                <div className="work-text">
                  <h4>Choose Your Nearest Restaurant</h4>
                  <p>
                    Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
                    tempus condimentum.
            </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="work-item">
                <div className="work-img">
                  <img src="/assets/images/home/img_2.svg" alt="" />
                </div>
                <div className="work-text">
                  <h4>Choose Food</h4>
                  <p>
                    Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
                    tempus condimentum.
            </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="work-item">
                <div className="work-img">
                  <img src="/assets/images/home/img_3.svg" alt="" />
                </div>
                <div className="work-text">
                  <h4>Get Delivery</h4>
                  <p>
                    Donec et tellus sed lorem condimentum maximus. Sed tempor, leo
                    tempus condimentum.
            </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export function FooterSection(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const { links } = props;
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.handleNav(newValue)
      }}
      showLabels
      className={classes.bottomRoot}
    >
      <BottomNavigationAction label="Track Order" icon={<span className="icon-track_order "></span>} />
      <BottomNavigationAction label="About Us" icon={<i className="fas fa-users" ></i>} href={links.about} target="_blank" />
      <BottomNavigationAction label="Contact" icon={<i className="fas fa-comment"  ></i>} href={links.contact} target="_blank" />
    </BottomNavigation>
  );
}

export function BrowsePlaces() {
  return (
    <div>
      <section className="browse-places">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="browse-heading">
          <h6> Browse Places </h6>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12 col-md-12">
        <div className="owl"></div>
      </div>
    </div>
  </div>
</section>;

    </div>
  )
}
interface IpopRests {restList:RestaurantDeliveryList[] | [] }
export function PopularRests(props:any) {
  const restList:RestaurantDeliveryList[] = props.restList
  const {showMeals} = props; 
  return (
    <section className="order-food-online">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="new-heading">
          <h1> Popular restaurants for you  </h1>
        </div>
      </div>
    </div>
    <div className="row">
      {restList.length &&  (restList as RestaurantDeliveryList[] ).map((rest,i)=> {
        if(i < 6 )
        return (
        <div key={i} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div className="all-meal">
          <div className="top">
            <a href="#" onClick={(e) => showMeals(rest.RestaurantId,e)} >
              <div className="bg-gradient" />
            </a>
            <div className="top-img">
              <img src={"/assets/images/meals/img-" + (i + 1) + ".jpg"} alt=""/>
            </div>
            <div className="logo-img">
            <img
              src={rest.RestaurantLogo ? imgBase + rest.RestaurantLogo : '/assets/images/meals/logo-4.jpg'}
              className=""
              alt=""
            />
            </div>
            <div className="top-text">
              <div className="heading">
                <h4>
                <a href="#" onClick={(e) => showMeals(rest.RestaurantId,e)} >
                {rest.RestaurantName.trim()}
                </a>
                </h4>
              </div>
              <div className="sub-heading">
                <h5>
                  {rest.Cuisines ? rest.Cuisines.trim() : 'Asian'}
                </h5>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-text">
              <div className="delivery">
                <i className="fas fa-shopping-cart" />
                Delivery Free : Free
              </div>
              <div className="time">
                <i className="far fa-clock" />
                Delivery Time : {rest.MinDeliveryTime} Min
              </div>
              <div className="star">
                {Array.from(new Array(Math.floor(Math.random() * Math.floor(4) + 1 )),(star,j)=><i key= {j}className="fas fa-star" />)}
                <div className="comments">
                  <a href="#">
                    <i className="fas fa-comment-alt" />
                    {rest.TotalPledge}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      )}
    </div>
    </div>
</section>

  )
}

export function FeaturedRests() {
  return (
    <section className="featured-restaurants">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="new-heading">
          <h1> Featured Restaurants </h1>
        </div>
        <div className="bg-resto">
          <div className="resto-item">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="resto-img">
                  <img
                    src="/assets/images/meals/logo_01.jpg"
                    alt=""
                  />
                  <div className="resto-name">
                    <h4>
                      <a href="#"> Food Roster </a>
                    </h4>
                    <p>Indian Restaurant</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="resto-location">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  New York City,1569
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="menu-btn">
                  
                  <a className="mn-btn btn-link" href="#">
                    {" "}
                    View Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="resto-item">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="resto-img">
                  <img
                    src="/assets/images/meals/logo_02.jpg"
                    alt=""
                  />
                  <div className="resto-name">
                    <h4>
                      <a href="#"> Chef House </a>
                    </h4>
                    <p>American Restaurant</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="resto-location">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  New York City,1569
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="menu-btn">
                  <a className="mn-btn btn-link" href="#">
                    {" "}
                    View Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="resto-item">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="resto-img">
                  <img
                    src="/assets/images/meals/logo_03.jpg"
                    alt=""
                  />
                  <div className="resto-name">
                    <h4>
                      <a href="#"> Rooster </a>
                    </h4>
                    <p>Indian Restaurant</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="resto-location">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  New York City,1569
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="menu-btn">
                  <a className="mn-btn btn-link" href="#">
                    {" "}
                    View Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="resto-item">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="resto-img">
                  <img
                    src="/assets/images/meals/logo_04.jpg"
                    alt=""
                  />
                  <div className="resto-name">
                    <h4>
                      <a href="#"> Limon Resto </a>
                    </h4>
                    <p>Australian Restaurant</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="resto-location">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  New York City,1569
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="menu-btn">
                  <a className="mn-btn btn-link" href="#">
                    {" "}
                    View Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="resto-item">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="resto-img">
                  <img
                    src="/assets/images/meals/logo_05.jpg"
                    alt=""
                  />
                  <div className="resto-name">
                    <h4>
                      <a href="#"> Ramen Bakery </a>
                    </h4>
                    <p>Canadian Bakery</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="resto-location">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  New York City,1569
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="menu-btn">
                  <a className="mn-btn btn-link" href="#">
                    {" "}
                    View Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  )
}

export const FavRecipe = (props) => {
  const restList:RestaurantDeliveryList[] = props.restList
  const {showMeals} = props; 
  return (
    <section className="explore-recipes">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="new-heading">
          <h1> Explore Your Favorite Recipes </h1>
        </div>
      </div>
    </div>
    <div className="b-recipes">
      <div className="row">
      {restList.length &&  (restList as RestaurantDeliveryList[] ).map((rest,i)=> {
        if(i < 6 )
        return (
          <div className="col-lg-4 col-md-6" key={i}>
          <a href="#" onClick={(e) => showMeals(rest.RestaurantId,e)}>
            <div className="recipe-item">
              <img src={"/assets/images/reciepe/recipe_0"+ (i + 1) + ".jpg"} alt=""  />
              <div className="overlay">
                <div className="recipes-title">
                  <h6> {rest.Cuisines.split(",")[0]} </h6>
                  <p>30+ Menus</p>
                </div>
              </div>
            </div>
          </a>
        </div>
       
        )
      })
    }
      </div>
    </div>
  </div>
</section>
  )
}






