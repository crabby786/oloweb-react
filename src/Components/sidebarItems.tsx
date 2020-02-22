import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import {HomeRoutes} from '../routes';
import clsx from "clsx";
import { Icon } from '@material-ui/core';

function activeRoute(routeName:any) {
  let route = window.location.hash
  return route.indexOf(routeName) > -1 ? true : false;
}

export const MainListItems = (props:any)=> {
  const {match}= props;
  return (
    <div>
      {HomeRoutes.map((route, i)=> (
          // <NavLink key={i} to={match.path +route.path} activeClassName="active" className={"navItem"} 
          // isActive={()=> activeRoute(route.path) } >
          <ListItem button  key={i}>
            <ListItemIcon>
              <Icon> {route.icon} </Icon>
            </ListItemIcon>
            <ListItemText primary= {route.name} />
          </ListItem>
          // </NavLink>
        ) )}
    </div>
  );
}

