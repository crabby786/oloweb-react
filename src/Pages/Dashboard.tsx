import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Link } from 'react-router-dom'
import {  Grid, Box, Typography } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import { dasboardModel as menus } from "../Models/dashboardModel";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx'

const dashboardStyle = (theme:Theme) => 
    createStyles({
        dashboardContainer :{
            background:'#fff',
            '& $imgBox': {}
        },
        imgBox:{}
    })

 class Dashboard extends Component<any, any> {
    state = {}
    
    render() {
        const {classes, match} = this.props
        
        return (
            <div className={classes.dashboardContainer}>
                <Grid container spacing={1}>
                    {menus.map((menu, i)=> (
                        <Grid item xs={4} md={4} key={i} >
                            <Link to={ menu.route} className={clsx("menu-box", classes.imgBox)} >
                                <img src={menu.img} alt="menu item"></img>
                                <Typography component="div" variant="caption"> {menu.name} </Typography>
                            </Link>
                        </Grid>
                    ) )}                

                    </Grid>    
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    
})

const mapDispatchToProps = {
    
}


export default compose <any, any>(
    withRouter,
    withStyles(dashboardStyle),
    connect(mapStateToProps, mapDispatchToProps),
  )(Dashboard);
