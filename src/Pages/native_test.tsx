import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter, Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { detailStyle } from "../Styles/jss/detailsPageStyle";
import { dasboardModel as menus } from "../Models/dashboardModel";
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { appLaunchAction } from "../Store/Actions/restListAction";

const dashboardStyle = (theme: Theme) =>
  createStyles({
    dashboardContainer: {
      background: "#fff",
      "& $imgBox": {},
    },
    imgBox: {},
  });

class NativeTest extends Component<any, any> {
  state = {};
  componentWillMount() {
    // const {appLaunchAction} = this.props;
    // appLaunchAction();
  }
  getCamera = () => {

  }
  getLoation = () => {
      
}
  render() {
    const { classes, match } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" onClick = {this.getCamera} >
          Camera
        </Button>
        <Button variant="contained" color="secondary" onClick = {this.getLoation}>
          location
        </Button>
        <Button variant="contained" color="primary" href="tel:+496170961709">
          dial
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    appLaunchAction: () => dispatch(appLaunchAction()),
  };
};

export default compose<any, any>(
  withRouter,
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(NativeTest);
