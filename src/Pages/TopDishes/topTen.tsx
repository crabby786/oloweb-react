import React, { useMemo, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Virtuoso } from 'react-virtuoso'
import { restListAction } from '../../Store/Actions/restListAction';
import { imgBase } from '../../Constants/DishCoApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const ListContainer = ({ listRef, style, children }: any) => {
  return (
    <List ref={listRef} style={{ ...style, padding: 0 }}>
      {children}
    </List>
  );
};

const ItemContainer = ({ children, ...props }: any) => {

  return (
    <ListItem {...props} style={{ margin: 0 }}>
      {children}
    </ListItem>
  );
};
const ItemContainerMemo = React.memo(ItemContainer, (pre,current)=> pre['data-index'] == current['data-index'])

function TopTen(props: any) {
  const classes = useStyles();
  const { restData } = props;
  const dishes:any[] = restData.data.AllRestaurantDishes;
  const allDishes = [];
  // const TOTAL_COUNT: number = dishes.length;
  const TOTAL_COUNT: number = restData.data.NoOfRestaurants.NoOfRestaurants;
  const loadedCount = useRef(0);
  const endReached = useRef(false);
  const [loadedRests, setLoadedRests] = useState<any[]>([]);
  const [IntLocNoOfRecords, setIntLocNoOfRecords] = useState<any>(0);

  const loadMore = () => {
    const getData = async() => {
      if (!endReached.current) {
          loadedCount.current += 30;
  
          if (loadedCount.current === TOTAL_COUNT) {
            endReached.current = true;
          }
          setIntLocNoOfRecords((prev:any) => prev + 30)          
          let queryParams = {IntLocNoOfRecords}
          await props.getRestList(queryParams);  

          setLoadedRests(val=> [...val, ...dishes] );
        }
    }
    
     getData();
  };

  useEffect(loadMore, []);
  return (
    <Virtuoso
      ListContainer={ListContainer}
      ItemContainer={ItemContainerMemo}
      style={{ width: '400px', height: '300px' }}
      totalCount={loadedRests.length}
      footer={() => {
        return (
          <div>
            {loadedRests.length === TOTAL_COUNT ? '-- end -- ' : ' loading...'}
          </div>
        );
      }}
      endReached={loadMore}
      overscan={29}
      item={index => {
        return (
          <>
            <ListItemAvatar>
              <h4> {index} </h4>
              <Avatar alt="A" src={imgBase + loadedRests[index].DishImage} />
            </ListItemAvatar>
            <ListItemText
              primary={`${loadedRests[index].RestaurantDishName}`}
              secondary={<span>{loadedRests[index].LocationName}</span>}
            />
          </>
        );
      }}
    />
  );
}

const mapStateToProps = (state: any) => ({
  restData: state.restListReducer
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestList: (queryParams: any) => dispatch(restListAction(queryParams))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(TopTen)
