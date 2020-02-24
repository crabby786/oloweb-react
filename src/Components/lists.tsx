import React, { useRef, useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { List, makeStyles, Box, ListItemAvatar, Avatar, Grid, Icon, Divider, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { imgBase } from '../Constants/DishCoApi';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Virtuoso } from 'react-virtuoso'
import { restListAction } from '../Store/Actions/restListAction';
import { onError } from 'redux-axios-middleware';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    fontSize: "small",
    marginTop: 0,
    '& h4': {
      marginTop: 0,
    },
    '& p': {
      // color:theme.palette.grey[500],
      marginTop: 0,
      marginBottom: "0px",
      fontSize: "0.8rem"
    },
    '& h5': {
      marginTop: 0,
      marginBottom: "0px"
    }
  },
  inline: {
    display: 'inline',
  },
  MuiDividerInset: {
    marginLeft: 0
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  }

}));


const ListContainer = ({ listRef, style, children }: any) => {
  const classes = useStyles();
  return (
    <List ref={listRef} style={{ ...style }} className={classes.root}>
      {children}
    </List>
  );
};

const ItemContainer = ({ children, ...props }: any) => {
  return (
    <ListItem {...props} alignItems="flex-start" disableGutters style={{ margin: 0 }} >
      {children}
    </ListItem>
  );
};
const ItemContainerMemo = React.memo(ItemContainer, (pre, current) => {
  return pre['data-index'] == current['data-index']
})


const RestList = (props: any) => {
  const { restData, classesUp } = props;
  const classes = useStyles();
  let history = useHistory();
  const showDetails = (restId: number) => {
    history.push("/home/restdetail/" + restId);
  };

  const dishes: any[] = restData.data.AllRestaurantDishes;
  const TOTAL_COUNT: number = restData.data.NoOfRestaurants.NoOfRestaurants;
  const loadedCount = useRef(0);
  const endReached = useRef(false);
  const [listLoading, setListLoading] = useState(false);
  const [loadedRests, setLoadedRests] = useState<any[]>([]);
  const [IntLocNoOfRecords, setIntLocNoOfRecords] = useState<any>(0);
  const loadMore = () => {
    const getData = async () => {
      if (!endReached.current) {
        loadedCount.current += 30;
        if (loadedCount.current === TOTAL_COUNT) {
          endReached.current = true;
        }
        setIntLocNoOfRecords((prev: any) => prev + 30)
        let queryParams = { IntLocNoOfRecords }
        await props.getRestList(queryParams);
        setLoadedRests(val => [...val, ...dishes]);
      }
    }
    getData();
  };

  useEffect(loadMore, []);
  const [visibleRange, setVisibleRange] = useState<string[] | number[]>(['-', '-'])

  return (
    <Virtuoso
      ListContainer={ListContainer}
      ItemContainer={ItemContainer}
      style={{ width: '100%', height: '100vh', }}
      totalCount={loadedRests.length}
      // scrollingStateChange={isScrolling => setListLoading(prev => isScrolling)}
      endReached={loadMore}
      overscan={100}
      
      item={index => (
        <div onClick={() => showDetails(loadedRests[index].RestaurantId)} style={{ width: '100%' }}>
            <Box alignItems="flex-start" display="flex">
              <Box px={1}>
                <span style={{ whiteSpace: "nowrap", fontSize: "small" }} >By Locals</span>
                <ListItemAvatar>
                  <Avatar alt="dish1" variant="rounded"
                    src={imgBase + loadedRests[index].DishImage} imgProps={{ onError: (e: any) => e.target.src = '/assets/images/other/img/DishCo_49.png' }} >
                  </Avatar>
                </ListItemAvatar>
              </Box>
              <Grid component="div" container spacing={1} wrap="nowrap" >
                <Grid item  >
                  <Icon fontSize="small" className={clsx(loadedRests[index].DishType == 1 ? classes.success : classes.error)} >fiber_manual_record</Icon>
                </Grid>
                <Grid item>
                  <div className="dataContainer" >
                    <h5> {loadedRests[index].RestaurantDishName} </h5>
                    <Typography color="error" >{'@ ' + loadedRests[index].RestaurantName} </Typography >
                    <h5> {loadedRests[index].LocationName} </h5>
                    <Typography className="text-muted" > {loadedRests[index].Cuisines} </Typography>
                    <Box mt={2}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item  >
                          <Icon fontSize="small" className={classesUp.iconWithText} >directions_walk</Icon>
                          <small> {loadedRests[index].Distance.toFixed(2)} </small>
                          <small>Km</small>
                        </Grid>
                        <Grid item>
                          <Icon fontSize="small" className={classesUp.iconWithText} >check_box</Icon>
                          <small> {loadedRests[index].Votes} </small>
                          <small>Votes</small>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Box>

          <Divider variant="fullWidth" component="div" />
        </div>
        )
      }
      footer={() => {
        return (
          <div className="bottom-loader">
            <LinearProgress />
          </div>
        );
      }}
      scrollSeek={{
        enter: velocity => Math.abs(velocity) > 100,
        exit: velocity => {
          const shouldExit = Math.abs(velocity) < 50
          if (shouldExit) {
            setVisibleRange(['-', '-'])
          }
          return shouldExit
        },
        change: (_velocity, { startIndex, endIndex }) =>
          setVisibleRange([startIndex, endIndex]),
        placeholder: ({ height, index }) => (
          <div
            style={{
              height,
              width:'100vw',
              backgroundColor: index % 2 ? '#fff' : '#f4f4f4',
              padding: '8px',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#ccc',
                height: '10px',
              }}
            ></div>
          </div>
        ),
      }}
    />

  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    // restData:state.restListReducer.data.AllRestaurantDishes
    restData: state.restListReducer
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams: any) => dispatch(restListAction(queryParams))
  }
}
export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
)(RestList);