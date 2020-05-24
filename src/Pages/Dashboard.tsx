import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { dasboardModel as menus } from "../Models/dashboardModel";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { appLaunchAction } from '../Store/Actions/restListAction'

const dashboardStyle = () =>
    createStyles({
        dashboardContainer: {
            background: '#fff',
            '& $imgBox': {}
        },
        imgBox: {}
    })

class Dashboard extends Component<any, any> {
    state = {}
    componentWillMount() {
        const {appLaunchAction} = this.props;
        appLaunchAction();
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.dashboardContainer}>
                <Grid container spacing={1}>
                    {menus.map((menu, i) => (
                        <Grid item xs={4} md={4} key={i} >
                            <Link to={{
                                pathname: menu.route,
                                state: { title: menu.name }
                            }} className={clsx("menu-box", classes.imgBox)}  >
                                <div style={{ height: '50px' }} >
                                    <img src={menu.img} alt="menu item"></img>
                                </div>
                                <Typography component="div" variant="caption"> {menu.name} </Typography>
                            </Link>
                        </Grid>
                    ))}

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = () => ({

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
)(Dashboard);
