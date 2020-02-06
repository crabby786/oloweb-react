import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withStyles, Grid, Box } from '@material-ui/core'
import { detailStyle } from '../Styles/jss/detailsPageStyle'
import { dasboardModel as menus } from "../Models/dashboardModel";

export class Dashboard extends Component<any, any> {
    state = {}
    
    render() {
        const {classes} = this.props
        return (
            <div className={classes.dashboardContainer}>
                <Grid container spacing={1}>
                <Grid item xs={4} md={6}>
                    <Box>

                    </Box>
                </Grid>

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
    withStyles(detailStyle),
    connect(mapStateToProps, mapDispatchToProps),
  )(Dashboard);
