import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { appLaunchAction } from '../../Store/Actions/restListAction'
import BannerSection from '../../Components/custom/banner_section'
import { homeStyle } from '../../Styles/jss/homePageStyles';
import { HowtoSection } from './Home_comps';
// import { FooterSection } from "./Home_comps";
import { MultiSlide } from "../comps/multi_slide";
import  '../../Styles/css/style1.css';
import { d_LandingPageBanner } from '../../Constants/dummy';


class OloHome extends Component<any, any> {
    state = {}
    componentWillMount() {
        // const {appLaunchAction} = this.props;
        // appLaunchAction();
    }
    render() {
        const { classes } = this.props
        const galleryObj = d_LandingPageBanner;
        return (
            <div className={classes.oloHomeContainer}>
              <BannerSection />
              <div className="gallery-section">
          <MultiSlide srcList={galleryObj.ImageAdvertisement} />
        </div>
              <div className="footer-section">
          {/* <FooterSection /> */}
        </div>
            </div>
        )
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        appLaunchAction:()=> dispatch(appLaunchAction() ) 
    }
}


export default compose<any, any>(
    withRouter,
    withStyles(homeStyle),
    connect(null, mapDispatchToProps),
)(OloHome);
