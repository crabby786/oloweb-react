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
import { imgBase } from "../Constants/DishCoApi";

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
      {value === index && <Box p={1} className="details-tab1">{children}</Box>}
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
  const { tabData, classes, content } = props;
  
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
          <Grid container  wrap="nowrap">
            <Grid item  xs= {6} style={{borderRight:'1px solid #afabab'}} >
              <Typography variant="subtitle1">Address</Typography>
              <Typography color="textSecondary" paragraph >
                {content.RestaurantAddress}
              </Typography>
              <Typography component="div" variant="h6" >
                <Icon className={clsx(classes.textBrown,classes.iconWithText)} >pin_drop</Icon> &nbsp;
                {/* value not found in api */}
                <span> {(content.Distance / 1000).toFixed(2) + ' Km' } </span>
              </Typography>
            </Grid>
            <Grid item  xs= {6} style={{paddingLeft:'4px'}}>
            <Typography variant="subtitle1">Phone</Typography>
              <Typography color="textSecondary" paragraph >
                {content.ContactNumber}
              </Typography>
              <Typography variant="subtitle1">Opening Hours</Typography>
              <Typography color="textSecondary" paragraph >
                {content.OpeningsHours}
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}  >
          <div className="text-center">
            <h5>Average Meal Price</h5>
            <small> {content.AvgMealRate} </small>
            <h5>Cuisins Served</h5>
            <small>{content.Cuisines[0].Cuisine}</small>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} >
          <div className="text-center credit-card-container" >
            <h5>
              Cash is always welcome <br></br>
              Following Cards are accepted
            </h5>
            {content.CrediteCards.map((card:any,i:number)=> <img src={imgBase + card.CrediteCardsImage} alt={card} key={'slideImg'+i}></img>  )}
          </div>
        </TabPanel>
      </SwipeableViews>
    
      </div>
  );
}
