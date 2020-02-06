import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
import clsx from "clsx";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.background.paper
    // width: 500,
  }
}));

export default function FullWidthTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const { tabData, classes, data } = props;
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.tabRoot}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={props.tabData[0].name} {...a11yProps(0)} />
          <Tab label={props.tabData[1].name} {...a11yProps(1)} />
          <Tab label={props.tabData[2].name} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <Grid container justify="space-between" wrap="nowrap">
            <Grid item >
              <Typography variant="subtitle1">Address</Typography>
              <Typography color="textSecondary" paragraph >
                Shop no. 3, saptrishi building, <br />
                sector 8,  Navi Mumbai
              </Typography>
              <Typography component="div" variant="h6" >
                <Icon className={clsx(classes.textBrown,classes.iconWithText)} >pin_drop</Icon> &nbsp;
                <span>0.4 Km</span>
              </Typography>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item >
            <Typography variant="subtitle1">Phone</Typography>
              <Typography color="textSecondary" paragraph >
                +91 9811009832 <br />
                +91 9811009832 
              </Typography>
              <Typography variant="subtitle1">Opening Hours</Typography>
              <Typography color="textSecondary" paragraph >
                08.00 AM to 10.00 PM
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} children={tabData[1].comp} />
        <TabPanel value={value} index={2} children={tabData[2].comp} />
      </SwipeableViews>
    
      </div>
  );
}
