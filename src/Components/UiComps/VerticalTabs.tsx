import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
    verticalTabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  vTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: 'calc(100vh - 65px)',
    width: '200px',
    background:theme.palette.grey[200],
    '& .Mui-selected':{
    background: '#ffffff',
    color: 'initial',
    }
  },
  selected:{},
  tabSelected: {}
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.verticalTabRoot} >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.vTabs}
      >
        <Tab label="Sort By" {...a11yProps(0)}  />
        <Tab label="Bank Cards" {...a11yProps(1)} classes = {{selected:classes.tabSelected, disabled:'tabDisabled', root:'tabNav'}}  />
        <Tab label="Cuisines" {...a11yProps(2)} />
        <Tab label="Average Meal Price For 2" wrapped {...a11yProps(3)} />
        <Tab label="Open Hours" {...a11yProps(4)} />
        <Tab label="Other Facilities" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {props.children[0]}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
