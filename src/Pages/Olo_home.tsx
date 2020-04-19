import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Box, Typography } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import { dasboardModel as menus } from "../Models/dashboardModel";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { appLaunchAction } from '../Store/Actions/restListAction'
import BannerSection from '../Components/custom/banner_section'
import FavoriteRecipes from '../Components/custom/FavoriteRecipes'
import RestaurantCards from '../Components/custom/restlist_cards'

const dashboardStyle = (theme: Theme) =>
    createStyles({
        dashboardContainer: {
            background: '#fff',
            '& $imgBox': {}
        },
        imgBox: {}
    })

class OloHome extends Component<any, any> {
    state = {}
    componentWillMount() {
        const {appLaunchAction} = this.props;
        appLaunchAction();
    }
    render() {
        const { classes, match } = this.props

        return (
            <div >
              <BannerSection />
              <FavoriteRecipes />
              <RestaurantCards />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps =(dispatch)=> {
    return {
        appLaunchAction:()=> dispatch(appLaunchAction() ) 
    }
}


export default compose<any, any>(
    withRouter,
    withStyles(dashboardStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(OloHome);
